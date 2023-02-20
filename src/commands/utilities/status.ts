import { Client, Colors, Message } from 'discord.js';
import { BaseCommand } from '../../structures/BaseCommand';
import { readFileSync } from 'fs';
import { cpus, loadavg, freemem, totalmem } from 'os';

function ram() {
    let raminfo;
    try {
        const used = readFileSync(`/sys/fs/cgroup/memory/memory.usage_in_bytes`).toString();
        const total = readFileSync(`/sys/fs/cgroup/memory/memory.limit_in_bytes`).toString();
        return raminfo = `${~~(used as any / 1024 / 1024)}/${~~(total as any / 1024 / 1024)}MB`;
    } catch {
        return raminfo = `${~~(totalmem() / 1024 / 1024 - freemem() / 1024 / 1024)}/${~~(totalmem() / 1024 / 1024)}MB`;
    }
};

export default class Status extends BaseCommand {
    private constructor() {
        super({
            name: 'status',
            aliases: []
        });
    }

    public execute(client: Client, message: Message): void {
        if (!message.guild?.members.me?.permissions.has('SendMessages')) return;
        if (!message.guild?.members.me?.permissionsIn(message.channelId).has('SendMessages')) return;if (!message.guild?.members.me?.permissions.has('SendMessages')) return;
        message.reply({
            embeds: [{
                fields: [
                    { name: 'Informações', value: `Processador: **${cpus()[0].model}**\nThreads: **${cpus().length}**` },
                    { name: 'Uso', value: `CPU: **${loadavg()[0]}%**\nRAM: **${ram()}**` }
                ],
                thumbnail: { url: client.user?.displayAvatarURL() as string },
                color: Colors.Blue
            }]
        });
    }
}