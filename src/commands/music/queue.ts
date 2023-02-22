import { Message, EmbedBuilder, Colors } from 'discord.js';
import { BaseClient } from '../../structures/BaseClient';
import { BaseCommand } from '../../structures/BaseCommand';

export default class Queue extends BaseCommand {
    private constructor() {
        super({
            name: 'queue',
            aliases: ['q']
        });
    }

    public execute(client: BaseClient, message: Message, args: string[]): void {
        if (!message.guild?.members.me?.permissions.has('SendMessages')) return;
        if (!message.guild?.members.me?.permissionsIn(message.channelId).has('SendMessages')) return;

        const player = client.manager.get(message.guild?.id as string);
        if (!player) {
            message.reply({ embeds: [{ description: `❌ O servidor não possui nenhum player ativo.`, color: Colors.Red }] });
            return;
        }

        const queue = player.queue;
        const embed = new EmbedBuilder().setColor('#000001').setAuthor({ name: `Fila de ${message.guild?.name}` });

        // quantia de músicas por páginas
        const multiple = 10;
        const page = args.length && Number(args[0]) ? Number(args[0]) : 1;

        const end = page * multiple;
        const start = end - multiple;

        const tracks = queue.slice(start, end);

        if (queue.current) embed.addFields({ name: `🎶 Música atual`, value: `[${queue.current.title}](${queue.current.uri})` });

        if (!tracks.length) {
            embed.setDescription(`Sem músicas ${page > 1 ? `páginas ${page}` : `na fila`}.`);
        } else {
            embed.setDescription(tracks.map((track, i) => `${start + (++i)} - [${track.title}](${track.uri})`).join('\n'));
        }
        const maxPages = Math.ceil(queue.length / multiple);
        embed.setFooter({ text: `Página ${page > maxPages ? maxPages : page} de ${maxPages} ` });
        embed.setThumbnail(message.guild?.iconURL({ size: 4096 }));

        message.reply({ embeds: [embed] });
    }
}