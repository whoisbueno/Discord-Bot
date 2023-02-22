import { Message, VoiceState, Colors } from 'discord.js';
import { BaseClient } from '../../structures/BaseClient';
import { BaseCommand } from '../../structures/BaseCommand';

export default class Volume extends BaseCommand {
    private constructor() {
        super({
            name: 'volume',
            aliases: ['vol']
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

        const volume = Number(args[0]);
        if (!volume || volume < 1 || volume > 300) {
            message.reply({ embeds: [{ description: `❌ O volume precisa ser entre 1 e 300.`, color: Colors.Red }] });
            return;
        }

        player.setVolume(volume);
        message.reply({ embeds: [{ description: `✅ Volume ajustado para \`${volume}\`.`, color: Colors.Green }] });
    }
}