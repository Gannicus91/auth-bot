import { Telegraf } from 'telegraf';
import {CustomContext} from './interface';
import { MongoClient } from 'mongodb';
import { session } from 'telegraf-session-mongodb';
import config from './config';

const bot = new Telegraf<CustomContext>(config.BOT_TOKEN);
const mongoClient = new MongoClient(config.MONGO_URI);

async function main(bot: Telegraf<CustomContext>, mongoClient: MongoClient) {
	try {
		await mongoClient.connect();
		const db = mongoClient.db('sessionsDB');

		bot.use(session(db, {
			collectionName: 'sessions',
		}));

		bot.start(async (ctx) => {
			ctx.reply('Welcome');
			ctx.session.username = ctx.from.username;
		});

		void bot.launch();
	} catch (e) {
		console.error(e);
	}
}

void main(bot, mongoClient);

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
