import { Message, VoiceState } from 'discord.js';
import { BaseClient } from '../../structures/BaseClient';
import { BaseCommand } from '../../structures/BaseCommand';

export default class Pause extends BaseCommand {
    private constructor() {
        super({
            name: 'pause',
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

        const { channel } = message.member?.voice as VoiceState;
        if (!channel) {
            return message.reply('\`❌\`┃Você precisa entrar em um canal de voz.');
        };

        if (channel.id !== player.voiceChannel) {
            return message.reply('\`❌\`┃Não estamos no mesmo canal de voz.');
        };

        if (player.paused) {
            return message.reply('\`❌\`┃O player já pausou a música.');
        };

        player.pause(true);
        message.reply('\`✔️\`┃A música foi pausada');
    }
}