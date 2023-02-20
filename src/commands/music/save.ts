import { Message } from 'discord.js';
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
        
        const player = client.manager.get(message.guild?.id as string);
        if (!player) {
            return message.reply('\`❌\`┃O servidor não possui nenhum player ativo.');
        };

        const queue = player.queue;
        try {
            await message.author.send({ content: `${queue.current?.uri}` });
            message.react('✅').catch(() => null);
        } catch {
            return message.reply('\`❌\`┃A sua DM precisa estar aberta!');
        };
    }
}