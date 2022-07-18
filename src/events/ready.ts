import { ActivityType, Client } from 'discord.js';
import { BaseEvent } from '../structures/BaseEvent';

export default class Ready extends BaseEvent {
    public execute(client: Client): void {
        client.user?.setActivity('I\'m ready!', { type: ActivityType.Watching });

        console.clear();
        console.log(`[+] Logged in as ${client.user?.tag}`);
    }
}