import { readdirSync } from 'fs';
import { BaseClient } from './BaseClient';

export class BaseLoader {
    public static async loadEvents(client: BaseClient) {
        const events = readdirSync('src/events');
        for (const files of events) {
            const eventName = files.split('.')[0];
            const eventFile = await import(`../events/${files}`);
            const Event = new eventFile.default(eventName);

            client.on(eventName, Event.execute.bind(Event, client));
        }
    }

    public static async loadCommands(client: BaseClient) {
        const commands = readdirSync('src/commands');
        for (const files of commands) {
            const commandFile = await import(`../commands/${files}`);
            const Command = new commandFile.default();

            client.commands.set(Command.name, Command);
            for (const alias of Command.aliases) {
                client.aliases.set(alias, Command);
            }
        }
    }
}