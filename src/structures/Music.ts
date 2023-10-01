import { EmbedBuilder, TextChannel } from "discord.js";
import { Connectors } from 'shoukaku';
import { Kazagumo, Plugins, KazagumoPlayer, KazagumoTrack } from 'kazagumo';
import type { Client } from '@structures/Client';
import { pino } from "@utils/Logger";
import { Nodes } from "@utils/Nodes";
import Spotify from "kazagumo-spotify";
import { getColorFromURL } from "color-thief-node";

export class KazaManager extends Kazagumo {
  client: Client;
  constructor(client: Client) {
    super(
      {
        plugins: [
        new Spotify({
          clientId: process.env.SpotifyId as string,
          clientSecret: process.env.SpotifySecretId as string,
          playlistPageLimit: 3,
          albumPageLimit: 4,
          searchLimit: 10,
          searchMarket: 'IN',
        }),
        new Plugins.PlayerMoved(client),
        ],
        defaultSearchEngine: 'youtube',
        send: (guildId, payload) => {
          const guild = client.guilds.cache.get(guildId);
          if (guild) guild.shard.send(payload);
        },
      },
      new Connectors.DiscordJS(client),
      Nodes
    );

    this.client = client;

    this.shoukaku
      .on('ready', (name) =>
        pino.info(`Shoukaku Connected to ${name} node`)
      )
    this.on("playerStart", async(player: KazagumoPlayer, track: KazagumoTrack) => {
      const cor = await getColorFromURL(track.thumbnail || '' as string);
      const channel = (await this.client.channels.fetch(
        player.textId
      )) as TextChannel;

      if(channel) {
      channel.send({
        embeds: [
          new EmbedBuilder()
          .setDescription(`A seguir: [${track.title}](${track.uri})`)
          .setColor(cor)
         ]
       })
      }
    })
  }
}