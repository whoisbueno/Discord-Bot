import { ChannelType, Message } from 'discord.js';
import { Client } from '@structures/Client';
import { Event } from '@structures/Event';

export default class MessageCreate extends Event {
    public async execute(client: Client, message: Message) {
        if (message.author.bot || message.channel.type == ChannelType.DM || !message.content.toLowerCase().startsWith(process.env.PREFIX as string)) return;

        const args = message.content.slice((process.env.PREFIX as string).length).trim().split(/ +/g);
        const command = args.shift()?.toLowerCase() as string;
        const exec = client.commands.get(command) || client.aliases.get(command);

        if (!exec) return;
        try {
            exec.execute(client, message, args);
        } catch (e) {
            console.log(`An error has ocurred at command ${command}`);
            console.error((e as Error).stack);
        }
    }
}