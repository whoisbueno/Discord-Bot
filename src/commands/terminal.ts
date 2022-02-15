import { Client, Message } from 'discord.js';
import { BaseCommand } from '../structures/BaseCommand';
import { exec } from 'child_process';

export default class Terminal extends BaseCommand {
    private constructor() {
        super({
            name: 'terminal',
            aliases: ['t']
        });
    }

    public async execute(client: Client, message: Message, args: string[]): Promise<void> {
        const code = args.join(' ');

        exec(code, (error, stdout, stderr) => {
            if (error) {
                return message.channel.send({
                    embeds: [{
                        description: `Saída: \n\`\`\`\n${error.message}\`\`\``,
                        color: '#000001'
                    }]
                }).catch(() => null);
            }

            return message.channel.send({ content: `\`\`\`arm\n${stdout.length !== 0 ? stdout : 'Ação concluída!'}\n${stderr}\`\`\``, }).catch(() => null);
        });
    }
}