import { SlashCommandBuilder } from 'discord.js'

const ping = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Replies with Pong')

// const pingCommand = ping.toJSON()

export default ping.toJSON()