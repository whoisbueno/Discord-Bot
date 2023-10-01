import { Client, Message, Colors, TextChannel } from 'discord.js';
import { Command } from '@structures/Command';

export default class Ping extends Command {
  private constructor() {
    super({
      name: "ping",
      aliases: []
    });
  }
  public execute(client: Client, message: Message, args: string[], t): void {
    message.reply(t("commands:ping.desc", { ping: client.ws.ping}))
  }
}