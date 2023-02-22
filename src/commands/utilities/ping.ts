import { Client, Message, Colors, TextChannel } from 'discord.js';
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

        (message.channel as TextChannel).send({ embeds: [{ description: `📡┃Latência: **${client.ws.ping}**ms.`, color: Colors.Green }] });
    }
}