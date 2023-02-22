import { Message, Colors } from 'discord.js';
import { BaseClient } from '../../structures/BaseClient';
import { BaseCommand } from '../../structures/BaseCommand';

export default class Save extends BaseCommand {
    private constructor() {
        super({
            name: 'save',
            aliases: []
        });
    }

    public async execute(client: BaseClient, message: Message): Promise<Message | void> {
        if (!message.guild?.members.me?.permissions.has('SendMessages')) return;
        if (!message.guild?.members.me?.permissionsIn(message.channelId).has('SendMessages')) return;
        
        const player = client.manager.get(message.guild?.id);
        if (!player) {
            message.reply({ embeds: [{ description: `❌ O servidor não possui nenhum player ativo.`, color: Colors.Red }] });
            return;
        }

        const queue = player.queue;
        message.author.send({ content: `${queue.current?.uri}` }).catch(() => {
            message.reply({ embeds: [{ description: `❌ A sua DM precisa estar aberta!`, color: Colors.Red }] });
        });

        message.react('✅').catch(() => null);
    }
}