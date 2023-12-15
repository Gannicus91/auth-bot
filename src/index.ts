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
			const username = ctx.from.username;

			if (username) {
				ctx.session.username = username?.toLowerCase();
				ctx.session.id = ctx.from.id;
				await ctx.replyWithMarkdownV2(`Привет, \`${username}\`\\! Будем знакомы😉`);
				await ctx.replyWithMarkdownV2('Я буду присылать тебе коды для авторизации в игре\\! А сейчас возвращайся, заполняй форму и жми *"Получить код"*');
				await ctx.replyWithMarkdownV2(`В поле *"Логин в telegram"* введи \`${username}\` \\- можешь кликнуть по своему логину и он будет скопирован\\! Имя можешь ввести какое нравится🤪`);
			} else {
				void ctx.replyWithMarkdownV2('Упс\\! Кажется у вас не установлено *"Имя пользователя"* в телеграм 😱\nУстановите его в настройках и возвращайтесь\\! Без него играть не получится🥲');
			}
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
