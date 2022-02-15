import { config } from 'dotenv'; config();
import { Client, Collection, ClientOptions } from 'discord.js';
import { BaseCommand } from './BaseCommand';
import { BaseLoader } from './BaseLoader';

const options: ClientOptions = {
    intents: [
        'GUILDS',
        'GUILD_MEMBERS',
        'GUILD_MESSAGES',
        'GUILD_PRESENCES'
    ]
};

export class BaseClient extends Client {
    public readonly commands: Collection<string, BaseCommand>;
    public readonly aliases: Collection<string, BaseCommand>;

    public constructor() {
        super(options);
        this.commands = new Collection();
        this.aliases = new Collection();
        BaseLoader.loadEvents(this);
        BaseLoader.loadCommands(this);
    }

    public connect() {
        super.login(process.env.TOKEN);
    }
}