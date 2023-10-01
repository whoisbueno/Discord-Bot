import { GatewayIntentBits, Partials } from 'discord.js';

export default {
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
	],
	partials: [Partials.Message, Partials.GuildMember],
};