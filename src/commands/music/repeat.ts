import { Message, VoiceState, Colors } from 'discord.js';
import { BaseClient } from '../../structures/BaseClient';
import { BaseCommand } from '../../structures/BaseCommand';

export default class Repeat extends BaseCommand {
    private constructor() {
        super({
            name: 'repeat',
            aliases: ['r', 'loop']
        });
    }

    public async execute(client: BaseClient, message: Message, args: string[]): Promise<Message | void> {
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

        if (args.length && /queue/i.test(args[0])) {
            player.setQueueRepeat(!player.queueRepeat);
            const queueRepeat = player.queueRepeat ? `enabled` : `disabled`;
            message.reply({ embeds: [{ description: `${queueRepeat} repetição da fila.`, color: Colors.Red }] });
            return;
        }

        player.setTrackRepeat(!player.trackRepeat);
        const trackRepeat = player.trackRepeat ? `enabled` : `disabled`;

        message.reply({ embeds: [{ description: `✅ ${trackRepeat.replace('enabled', 'Ativado').replace('disabled', 'Desativado')} a repetição da música.`, color: Colors.Green }] });
    }
}