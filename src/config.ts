import { config as dotenvConf } from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
	dotenvConf();
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
	BOT_TOKEN: String(process.env.BOT_TOKEN),
	ADMIN: String(process.env.ADMIN).split(','),
	ENV: String(process.env.NODE_ENV),
};

export default config;
