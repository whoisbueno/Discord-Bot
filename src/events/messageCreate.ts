import { ChannelType, Message } from 'discord.js';
import { readdirSync } from "fs";
import { Client } from '@structures/Client';
import { Event } from '@structures/Event';
import i18next from "i18next";
import translationBackend from "i18next-node-fs-backend";

export default class MessageCreate extends Event {
    public async execute(client: Client, message: Message) {
      
        let prefix: string
        const mentionRegex = message.content.match(new RegExp(`^<@!?(${client.user.id})>`, 'gi'));
        if (message.author.bot || message.channel.type == ChannelType.DM) return;

        if (message.content.match(new RegExp(`^<@!?(${client.user.id})>`, 'gi'))) {
        prefix = String(mentionRegex);
        } else if (message.content.toLowerCase().startsWith('bot')) {
        prefix = 'bot';
        } else {
        prefix = '.';
         }
        const args = message.content.slice((prefix).length).trim().split(/ +/g);
        const command = args.shift()?.toLowerCase() as string;
        const exec = client.commands.get(command) || client.aliases.get(command);

        var t: any;
        const setFixedT = function(translate){
           t = translate
          };
        
        const language = "en-US"
        setFixedT(i18next.getFixedT(language))
        
        i18next.use(translationBackend).init({
            ns: ['commands'],
            preload: await readdirSync('./src/locales'),
            fallbackLng: 'pt-BR',
            backend: {
                loadPath: `./src/locales/{{lng}}/{{ns}}.json`
            },
            interpolation: {
                escapeValue: false
            },
            returnEmptyString: false
        }, async () => {
        if (!exec) return;
        try {
            exec.execute(client, message, args, t);
        } catch (e) {
            console.log(`An error has ocurred at command ${command}`);
            console.error((e as Error).stack);
        }
      })
    }
}