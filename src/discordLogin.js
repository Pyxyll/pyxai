import { Client, Events, GatewayIntentBits } from "discord.js";
import * as keys from './keys.js'
import logUpdate from 'log-update';

export const discordBotClient = new Client({ intents: [GatewayIntentBits.Guilds] });

export default function botInit() {
    discordBotClient.once(Events.ClientReady, c => {
        console.log(`\x1b[32m%s\x1b[0m`, `Ready! Logged in as ${c.user.tag}`);
    });


    discordBotClient.login(keys.token);
}


