import { Client as DiscordClient, Collection } from "discord.js";
import { Command } from "@structures/Command";
import { Manager } from "@structures/Managers";
import ClientOptions from "@utils/ClientOptions";
import { KazaManager } from "@structures/Music";

export class Client extends DiscordClient {
  public readonly commands: Collection<string, Command>;
  public readonly aliases: Collection<string, Command>;
  public readonly manager: KazaManager;
  
  public constructor() {
    super(ClientOptions);
    this.commands = new Collection();
    this.aliases = new Collection();
    this.manager = new KazaManager(this);
    Manager.loadCommands(this);
    Manager.loadEvents(this);
  }

  public connect(): void {
    super.login(process.env.DISCORD_TOKEN as string);
  }
}