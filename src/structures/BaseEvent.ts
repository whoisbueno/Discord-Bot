import { Client, Message } from 'discord.js';

export abstract class BaseEvent {
    public execute(client: Client, message?: Message) { }
}