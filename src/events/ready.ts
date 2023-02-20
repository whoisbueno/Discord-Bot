import { ActivityType } from 'discord.js';
import { BaseClient } from '../structures/BaseClient';
import { BaseEvent } from '../structures/BaseEvent';

export default class Ready extends BaseEvent {
    public execute(client: BaseClient) {
        client.user?.setActivity(`${process.env.PREFIX as string}play`, { type: ActivityType.Listening });
        client.manager.init(client.user?.id);

        console.clear();
        console.log(`[+] Conectado como ${client.user?.tag}`);
    }
}