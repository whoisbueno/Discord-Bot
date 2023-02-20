import { Client, TextChannel } from 'discord.js';
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
            const channel = client.channels.cache.get(player.textChannel as string) as TextChannel
            channel.send(`🎶 Tocando agora: \`${track.title}\`\nRequisitado por: ${(track as any).requester.toString()}.`);
        })
        .on('queueEnd', player => {
            const channel = client.channels.cache.get(player.textChannel as string) as TextChannel;
            channel.send('Fim da playlist.');
            player.destroy();
        })
}