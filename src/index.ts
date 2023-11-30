import { Telegraf } from 'telegraf';
import LocalSession from 'telegraf-session-local';
import {CustomContext} from './interface';

const localSession = new LocalSession({ database: 'user_data.json' });

const bot = new Telegraf<CustomContext>(String(process.env.BOT_TOKEN));
bot.use((localSession).middleware());

bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
void bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
