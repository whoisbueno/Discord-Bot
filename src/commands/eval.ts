import { Client, Colors, Message } from 'discord.js';
import { BaseCommand } from '../structures/BaseCommand';
import { inspect } from 'util';
import { writeFileSync, unlinkSync } from 'fs';

export default class Evaluate extends BaseCommand {
    private constructor() {
        super({
            name: 'eval',
            aliases: []
        });
    }

    public async execute(client: Client, message: Message, args: string[]): Promise<Message | undefined> {
        if (!args) return;

        try {
            const code = args.join(' ');
            const toEvalCode = code.includes('await') || code.includes('return') ? `(async () => { ${code} })()` : code;
            const evaluated = inspect(await eval(toEvalCode));

            if (evaluated.length < 1024) {
                message.channel.send({
                    embeds: [{
                        fields: [
                            { name: 'Entrada:', value: `\`\`\`js\n${code}\`\`\`` },
                            { name: 'Saída:', value: `\`\`\`js\n${evaluated}\`\`\`` }
                        ],
                        color: Colors.Gold
                    }]
                });
                return;
            } else {
                writeFileSync('eval.js', evaluated);
                await message.channel.send({ files: ['eval.js'] });
                unlinkSync('eval.js');
                return;
            }
        } catch (e) {
            return message.channel.send({ content: `\`\`\`js\n${(e as Error).message}\`\`\`` });
        }
    }
}