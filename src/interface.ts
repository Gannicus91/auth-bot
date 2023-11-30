import {Context as TelegrafContext} from 'telegraf/typings/context';

export interface ITelegrafSession {
	userName?: string;
}

export interface DBItem {
	id: string;
	data: ITelegrafSession;
}

export interface CustomContext extends TelegrafContext {
	session: ITelegrafSession;
	sessionDB: any;
}
