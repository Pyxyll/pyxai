import { SlashCommandBuilder } from "discord.js";

const rolesCommand = new SlashCommandBuilder()
    .setName("addrole")
    .setDescription("Add a Role")
    .addRoleOption((option) =>
        option
            .setName('NewRole')
            .setDescription("Adds the new role")
            .setRequired(true)
    )

export default rolesCommand.toJSON()