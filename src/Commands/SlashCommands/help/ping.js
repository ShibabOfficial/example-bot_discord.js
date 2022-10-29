const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Permissions, Discord, Collection } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    timeout: 2000,
    data: new SlashCommandBuilder()
      .setName("ping")
      .setDescription("shows bot ping"),
    async execute(interaction, client) {
        interaction.reply({ content: `My ping is: ${client.ws.ping}` });
    }
}