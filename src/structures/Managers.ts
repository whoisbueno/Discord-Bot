import { Client } from '@structures/Client';
import { readdirSync } from 'fs';

export class Manager {
    public static async loadEvents(client: Client): Promise<void> {
        const events = readdirSync('src/events/');

        for (const files of events) {
            const eventFile = await import(`../events/${files}`);
            const Event = new eventFile.default(files.split('.')[0]);

            client.on(files.split('.')[0], Event.execute.bind(events, client));
        }
    }

    public static async loadCommands(client: Client): Promise<void> {
        const commands = readdirSync('src/commands/');

        for (const folder of commands) {
            const files = readdirSync(`src/commands/${folder}`);
            for (const file of files) {
                const commandFile = await import(`../commands/${folder}/${file}`);
                const Command = new commandFile.default();

                client.commands.set(Command.name, Command);
                for (const alias of Command.aliases) {
                    client.aliases.set(alias, Command);
                }
            }
        }
    }
}