import { Telegraf } from 'telegraf';
import {CustomContext} from './interface';
import { MongoClient } from 'mongodb';
import { session } from 'telegraf-session-mongodb';
import config from './config';

const bot = new Telegraf<CustomContext>(config.BOT_TOKEN);
const connectionString = `mongodb://${config.MONGO_USERNAME}:${config.MONGO_PASSWORD}@${config.MONGO_HOST}:${config.MONGO_PORT}?authSource=admin`;
const mongoClient = new MongoClient(connectionString);

async function main(bot: Telegraf<CustomContext>, mongoClient: MongoClient) {
	try {
		await mongoClient.connect();
		const db = mongoClient.db('sessionsDB');

		bot.use(session(db, {
			collectionName: 'sessions',
		}));

		bot.start(async (ctx) => {
			ctx.reply('Welcome');
			ctx.session.username = ctx.from.username?.toLowerCase();
			ctx.session.id = ctx.from.id;
		});

		void bot.launch();
	} catch (e) {
		console.error(e);
	}
}

void main(bot, mongoClient);
console.log('Bot started');

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
