import { config } from 'dotenv'; config();
import { Client, Collection, ClientOptions } from 'discord.js';
import { BaseCommand } from './BaseCommand';
import { BaseLoader } from './BaseLoader';
import { Manager } from 'erela.js';
import erela from './BaseManager';

const options: ClientOptions = {
    intents: [
        'Guilds',
        'GuildMessages',
        'MessageContent',
        'GuildVoiceStates'
    ],
    allowedMentions: { parse: ['users'] }
};

export class BaseClient extends Client {
    public readonly commands: Collection<string, BaseCommand>;
    public readonly aliases: Collection<string, BaseCommand>;
    public readonly manager: Manager;

    public constructor() {
        super(options);
        this.commands = new Collection();
        this.aliases = new Collection();
        this.manager = erela(this);
        BaseLoader.loadEvents(this);
        BaseLoader.loadCommands(this);
    }

    public connect(): void {
        super.login(process.env.TOKEN as string);
    }
}