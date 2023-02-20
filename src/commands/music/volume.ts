import { Message, VoiceState } from 'discord.js';
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
        
        const player = client.manager.get(message.guild?.id as string);
        if (!player) {
            return message.reply('\`❌\`┃O servidor não possui nenhum player ativo.');
        };

        const { channel } = message.member?.voice as VoiceState;
        if (!channel) {
            return message.reply('\`❌\`┃Você precisa entrar em um canal de voz.');
        };

        if (channel.id !== player.voiceChannel) {
            return message.reply('\`❌\`┃Não estamos no mesmo canal de voz.');
        };

        const volume = Number(args[0]);

        if (!volume || volume < 1 || volume > 300) {
            return message.reply('\`❌\`┃O volume precisa ser entre 1 e 300.');
        }

        player.setVolume(volume);
        message.reply(`\`✔️\`┃Volume ajustado para \`${volume}\`.`);
    }
}