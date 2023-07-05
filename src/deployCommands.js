import { REST, Routes } from 'discord.js';
import * as keys from './keys.js';


const rest = new REST().setToken(keys.token);

const refreshCommands = async () => {
    const commands = [
        {
            name: 'helper',
            description: 'Test Command',
            options: [
                {
                    name: 'option1',
                    description: 'Test Option',
                    type: 3,
                    required: true,
                    choices: [
                        {
                            name: 'predefined',
                            value: 'predefined',
                        },
                        {
                            name: 'predefined2',
                            value: 'predefined2',
                        },
                    ]
                },
                {
                    name: 'option2',
                    description: 'Test Option2',
                    type: 3,
                    required: true,
                    choices: [
                        {
                            name: 'predefined',
                            value: 'predefined',
                        },
                        {
                            name: 'predefined2',
                            value: 'predefined2',
                        },
                    ]
                }
            ]
        },
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