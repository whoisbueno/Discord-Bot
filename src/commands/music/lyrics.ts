import { Client, Message, Colors } from 'discord.js';
import { BaseCommand } from '../../structures/BaseCommand';
//@ts-ignore
import lyricsFinder from 'lyrics-finder';

export default class Lyrics extends BaseCommand {
    private constructor() {
        super({
            name: 'lyrics',
            aliases: ['letra']
        })
    }

    public async execute(client: Client, message: Message, args?: string[]): Promise<Message | void> {
        if (!message.guild?.members.me?.permissions.has('SendMessages')) return;
        if (!message.guild?.members.me?.permissionsIn(message.channelId).has('SendMessages')) return;
        if (!args || args.length < 1) return;

        const lyrics = await lyricsFinder(args.join(' '), args.join(' '));
        if (!lyrics) return message.reply('\`❌\`┃Não foi possível encontrar a letra desejada, tente novamente!');

        message.reply({ embeds: [{ description: `${lyrics}`, color: Colors.Blue }] });
    }
}