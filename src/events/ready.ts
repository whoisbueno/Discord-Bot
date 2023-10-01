import { ActivityType } from 'discord.js';
import { Client } from '@structures/Client';
import { Event } from '@structures/Event';
import { pino } from "@utils/Logger";

export default class Ready extends Event {
    public execute(client: Client) {
        client.user?.setActivity(`${process.env.PREFIX as string}play`, { type: ActivityType.Listening });

        console.clear();
        pino.info(`successfully connected to discord api`);
    }
}