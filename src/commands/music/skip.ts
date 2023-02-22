import { Message, VoiceState, Colors } from 'discord.js';
import { BaseClient } from '../../structures/BaseClient';
import { BaseCommand } from '../../structures/BaseCommand';

export default class Skip extends BaseCommand {
    private constructor() {
        super({
            name: 'skip',
            aliases: ['next', 'n', 'sk']
        });
    }

    public async execute(client: BaseClient, message: Message): Promise<Message | void> {
        if (!message.guild?.members.me?.permissions.has('SendMessages')) return;
        if (!message.guild?.members.me?.permissionsIn(message.channelId).has('SendMessages')) return;

        const player = client.manager.get(message.guild?.id);
        if (!player) {
            return message.reply({ embeds: [{ description: `❌ O servidor não possui nenhum player ativo.`, color: Colors.Red }] });
        }

        const { channel } = message.member?.voice as VoiceState;
        if (!channel) {
            return message.reply({ embeds: [{ description: `❌ Você precisa entrar em um canal de voz.`, color: Colors.Red }] });
        }

        if (channel.id !== player.voiceChannel) {
            return message.reply({ embeds: [{ description: `❌ Não estamos no mesmo canal de voz.`, color: Colors.Red }] });
        }

        if (!player.queue.current) {
            return message.reply({ embeds: [{ description: `❌ O player já pausou a música.`, color: Colors.Red }] });
        }

        const { title, uri } = player.queue.current;
        player.stop();

        message.reply({ embeds: [{ description: `✅ [${title}](${uri}) foi trocada.`, color: Colors.Green }] });
    }
}