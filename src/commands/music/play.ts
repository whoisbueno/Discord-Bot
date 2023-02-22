import { Message, PermissionFlagsBits, Colors } from 'discord.js';
import { BaseClient } from '../../structures/BaseClient';
import { BaseCommand } from '../../structures/BaseCommand';

export default class Play extends BaseCommand {
    private constructor() {
        super({
            name: 'play',
            aliases: ['p']
        });
    }

    public async execute(client: BaseClient, message: Message, args: string[]): Promise<Message | void> {
        if (!message.guild?.members.me?.permissions.has('SendMessages')) return;
        if (!message.guild?.members.me?.permissionsIn(message.channelId).has('SendMessages')) return;
        if (!message.guild?.members.me?.permissions.has([PermissionFlagsBits.Connect, PermissionFlagsBits.Speak])) {
            return message.reply({ embeds: [{ description: `❌ Eu não tenho permissão para conectar no canal!`, color: Colors.Red }] });
        }

        if (!message.member?.voice.channel) {
            return message.reply({ embeds: [{ description: `❌ Você precisa estar em um canal de voz para usar esse comando!`, color: Colors.Red }] });
        }

        if (message.guild?.members.me?.voice.channel && message.guild?.members.me?.voice.channel.id !== message.member.voice.channel.id) {
            return message.reply({ embeds: [{ description: `❌ Estou conectado em outro canal nesse momnento!`, color: Colors.Red }] });
        }

        const search = args.join(' ');
        if (!search) {
            return message.reply({ embeds: [{ description: `❌ Você precisa inserir um **nome** ou **link** válido!`, color: Colors.Red }] });
        }

        let res;
        const player = client.manager.create({
            guild: message.guild?.id as string,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id
        });

        try {
            res = await client.manager.search(search, message.author);

            if (res.loadType === 'LOAD_FAILED') {
                if (!player.queue.current) player.destroy();
                throw res.exception;
            }
        } catch (err) {
            if (err instanceof Error) return message.reply({ embeds: [{ description: `❌ Ocorreu um erro: \`${err.message}\``, color: Colors.Red }] })
        }

        if (!res?.tracks?.[0]) {
            return message.reply({ embeds: [{ description: `❌ Não encontrei resultados!`, color: Colors.Red }] });
        }

        if (player.state !== 'CONNECTED') player.connect();

        if (search.includes('&list=')) {
            player.queue.add(res?.tracks);
            if (!player.playing && !player.paused) player.play();
            message.reply({ embeds: [{ description: `🎶 [${res.tracks[0].title}](${res.tracks[0].uri}) **playlist** adicionado à fila.`, color: Colors.Green }] });
        } else {
            player.queue.add(res?.tracks[0]);
            if (!player.playing && !player.paused) player.play();
            message.reply({ embeds: [{ description: `🎶 [${res.tracks[0].title}](${res.tracks[0].uri}) adicionado à fila.`, color: Colors.Green }] });
        }

    }
}