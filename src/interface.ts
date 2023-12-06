import {Context as TelegrafContext} from 'telegraf/typings/context';

export interface ITelegrafSession {
	id: number,
	username?: string;
}

export interface DBItem {
	id: string;
	data: ITelegrafSession;
}

export interface CustomContext extends TelegrafContext {
	session: ITelegrafSession;
	sessionDB: any;
}
