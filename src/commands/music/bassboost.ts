import { Message, VoiceState, Colors } from 'discord.js';
import { BaseClient } from '../../structures/BaseClient';
import { BaseCommand } from '../../structures/BaseCommand';

const levels = {
    none: 0.0,
    low: 0.10,
    medium: 0.15,
    high: 0.25,
};

export default class BassBoost extends BaseCommand {
    private constructor() {
        super({
            name: 'bassboost',
            aliases: ['bs', 'bass']
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

        let level = "none";
        if (args.length && args[0].toLowerCase() in levels) level = args[0].toLowerCase();

        const bands = new Array(3)
            .fill(null)
            .map((_, i) =>
                ({ band: i, gain: (levels as never)[level] })
            );

        player.setEQ(...bands);

        message.reply({ embeds: [{ description: `✅ Grave ajustado para \`${level}\``, color: Colors.Green }] });
    }
}