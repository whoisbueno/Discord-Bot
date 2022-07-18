import { config } from 'dotenv'; config({ path: 'src/.env' });
import { Client, Collection, ClientOptions } from 'discord.js';
import { BaseCommand } from './BaseCommand';
import { BaseLoader } from './BaseLoader';

const options: ClientOptions = {
    intents: [
        'Guilds',
        'GuildMembers',
        'GuildMessages',
        'GuildPresences'
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