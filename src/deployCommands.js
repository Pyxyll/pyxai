import { REST, Routes } from 'discord.js';
import * as keys from './keys.js';
import ping from './commands/ping.js'
import rolesCommand from './commands/roles.js'



const rest = new REST().setToken(keys.token);

const refreshCommands = async () => {

    const commands = [
        ping,
        rolesCommand
    ];


    try {
        console.log(`\x1b[33m%s\x1b[0m`, `Started refreshing ${commands.length} application (/) commands.`);
        const data = await rest.put(
            Routes.applicationGuildCommands(keys.discordClientId, keys.discordGuildId),
            { body: commands }
        );

        console.log(`\x1b[32m%s\x1b[0m`, `Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // Make sure to catch and log any errors
        console.error(error);
    }
};

export default refreshCommands;