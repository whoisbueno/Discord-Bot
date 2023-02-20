import { Client, Message } from 'discord.js';
import { BaseCommand } from '../../structures/BaseCommand';

export default class Ping extends BaseCommand {
    private constructor() {
        super({
            name: 'ping',
            aliases: []
        });
    }

    public execute(client: Client, message: Message): void {
        if (!message.guild?.members.me?.permissions.has('SendMessages')) return;
        if (!message.guild?.members.me?.permissionsIn(message.channelId).has('SendMessages')) return;
        message.reply(`${client.ws.ping}ms.`);
    }
}