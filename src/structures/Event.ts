import { Client, Message } from 'discord.js';

export abstract class Event {
    public execute(client: Client, message?: Message) { }
}