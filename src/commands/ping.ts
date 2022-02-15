import { Client, Message } from 'discord.js';
import { BaseCommand } from '../structures/BaseCommand';

export default class Ping extends BaseCommand {
    private constructor() {
        super({
            name: 'ping',
            aliases: []
        });
    }

    public execute(client: Client, message: Message): Promise<Message> {
        return message.channel.send({ content: `${client.ws.ping}ms.` });
    }
}