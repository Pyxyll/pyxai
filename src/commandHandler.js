import * as login from './discordLogin.js'

export default async function interactionListener() {
    login.discordBotClient.on('interactionCreate', (interaction) => {
        if (interaction.isChatInputCommand('ping')) {
            console.log(`Bot replied with ${interaction.reply}`)
            interaction.reply({ content: `pong` })
        }
    })
}