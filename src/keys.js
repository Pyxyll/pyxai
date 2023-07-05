import * as dotenv from "dotenv";

dotenv.config()
const token = process.env.discordBotToken;
const discordClientId = process.env['discordClientId'];
const discordGuildId = process.env['discordGuildId'];

export { token, discordClientId, discordGuildId };