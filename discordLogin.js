import { Client, Events, GatewayIntentBits } from "discord.js";
import * as dotenv from "dotenv";
dotenv.config()

const discordBotClient = new Client({ intents: [GatewayIntentBits.Guilds] });
const token = process.env.discordBotToken;

export default function botInit() {
    discordBotClient.once(Events.ClientReady, c => {
        console.log(`Ready! Logged in as ${c.user.tag}`);
    });

    discordBotClient.login(token);
}


