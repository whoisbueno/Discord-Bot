import { Client, TextChannel, Colors } from 'discord.js';
import { Manager } from 'erela.js';

export = (client: Client) => {
    return new Manager({
        nodes: [
            {
                host: 'lava.link',
                port: 80,
                password: 'password',
                secure: false
            }
        ],
        autoPlay: true,
        send: (id, payload) => {
            const guild = client.guilds.cache.get(id);
            if (guild) guild.shard.send(payload);
        }
    })
        .on('nodeConnect', node => console.log(`[+] Lavalink conectado com sucesso.`))
        .on('nodeError', (node, error) => console.log(`Node '${node.options.identifier}' encontrou um erro: ${error.message}.`))
        .on('trackStart', (player, track) => {
            const timestamp = track.duration / 1000;
            const hours = Math.floor(timestamp / 60 / 60);
            const minutes = Math.floor(timestamp / 60) - (hours * 60);
            const seconds = timestamp % 60;

            const formatted = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');

            const channel = client.channels.cache.get(player.textChannel as string);
            (channel as TextChannel).send({
                embeds:
                    [{
                        title: `✅ Tocando agora:`,
                        description: `[${track.title}](${track.uri})\n[\`${formatted || 'LIVE'}\`]\n\nRequisitado por: ${(track.requester as any).toString()}`,
                        thumbnail: { url: track.thumbnail as string },
                        color: Colors.Green
                    }]
            });
        })
        .on('queueEnd', player => {
            const channel = client.channels.cache.get(player.textChannel as string) as TextChannel;
            channel.send({ embeds: [{ description: `✅ Fim da playlist, saindo do canal de voz.`, color: Colors.Green }] });;
            player.destroy();
        })
}