import { SlashCommandBuilder } from 'discord.js';

// module.exports = {
// 	data: new SlashCommandBuilder()
// 		.setName('ping')
// 		.setDescription('Replies with Pong!'),
// 	async execute(interaction) {
// 		await interaction.reply('Pong!');
// 	},
// };

const ping = new SlashCommandBuilder()
	.setname('ping')
	.setDescription('Replies with Pong')
	