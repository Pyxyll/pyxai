import * as login from './discordLogin.js'

export default async function interactionListener() {
    login.discordBotClient.on('interactionCreate', (interaction) => {
        if (interaction.isChatInputCommand()) {
            console.log('Howdy', interaction.options.getString(''))
            interaction.reply({ content: `option selected is ${interaction.options.get('option1').value}` })
        }
    })
}