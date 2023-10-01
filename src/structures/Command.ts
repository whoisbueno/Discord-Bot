import { Client, Message } from 'discord.js';

interface ICommand {
    name: string,
    aliases: string[],
}

export abstract class Command {
    public readonly name: string;
    public readonly aliases: string[]

    public constructor(params: Omit<ICommand, 'execute'>) {
        this.name = params.name;
        this.aliases = params.aliases;
    }

    public execute(client: Client, message: Message, args?: string[]) { }
}