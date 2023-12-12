import { config as dotenvConf } from 'dotenv';
import * as fs from 'fs';

if (process.env.NODE_ENV !== 'production') {
	dotenvConf();
}

let BOT_TOKEN = String(process.env.BOT_TOKEN);

if (BOT_TOKEN.startsWith('/')) {
	BOT_TOKEN = fs.readFileSync(BOT_TOKEN).toString().trim();
}

/**
 * Настройки
 * @type token: string - Токен бота
 * @type path: string - относительный путь до директории с сертификатами
 * @type key: string - приватный ключ
 * @type cert: string - сертификат сервера
 * @type ca: string - сертификат клиента
 * @type port: number - порт
 * @type domain: string - домен
 * @type whpath: string - путь
 * @type admin: number - id владельца бота
 */
const config = {
	BOT_TOKEN,
	ADMIN: String(process.env.ADMIN).split(','),
	ENV: String(process.env.NODE_ENV),
	MONGO_USERNAME: String(process.env.MONGO_USERNAME),
	MONGO_PASSWORD: String(process.env.MONGO_PASSWORD),
	MONGO_HOST: String(process.env.MONGO_HOST),
	MONGO_PORT: String(process.env.MONGO_PORT),
};

export default config;
