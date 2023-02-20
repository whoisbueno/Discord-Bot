import { Message, PermissionFlagsBits } from 'discord.js';
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
            return message.reply('\`❌\`┃Eu não tenho permissão para conectar no canal!');
        }

        if (!message.member?.voice.channel) {
            return message.reply('\`❌\`┃Você precisa estar em um canal de voz para usar esse comando!');
        };

        if (message.guild?.members.me?.voice.channel && message.guild?.members.me?.voice.channel.id !== message.member.voice.channel.id) {
            return message.reply('\`❌\`┃Estou conectado em outro canal nesse momnento!');
        };

        const search = args.join(' ');
        if (!search) {
            return message.reply('\`❌\`┃Você precisa inserir um nome ou link válido!');
        };

        let res;
        const player = client.manager.create({
            guild: message.guild?.id as string,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id
        })

        try {
            res = await client.manager.search(search, message.author);

            if (res.loadType === 'LOAD_FAILED') {
                if (!player.queue.current) player.destroy();
                throw res.exception;
            }
        } catch (err) {
            if (err instanceof Error) return message.reply({ content: `\`❌\`┃Ocorreu um erro: \`${err.message}\`` });
        }

        if (!res?.tracks?.[0]) {
            return message.reply({ content: `\`❌\`┃Não encontrei resultados!` });
        }

        if (player.state !== 'CONNECTED') player.connect()
        player.queue.add(res.tracks[0])

        if (!player.playing && !player.paused) player.play();

        message.reply({ content: `\`✔️\`┃\`${res.tracks[0].title}\` adicionado à fila.` });
    }
}