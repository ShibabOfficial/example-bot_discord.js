const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Permissions, Discord, Collection } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    timeout: 2000,
    data: new SlashCommandBuilder()
      .setName("count")
      .setDescription("counts to specific number!")
      .addNumberOption(option => option
          .setName('number')
          .setDescription('number')
          .setRequired(true)
        ),
    async execute(interaction, client) {
        const num = interaction.options.getNumber('number');

        if (num > 100)
            return interaction.reply({ content: "number cannot be over then 100!" });
        else if (num < 0)
            return interaction.reply({ content: "number cannot be less then 0!" });

        var fstring = "";

        for (var i = 1; i < num + 1; i++) {
            if (i == num) {
                fstring = fstring + i;
                break;
            }

            fstring = fstring + i + ", ";
        }

        interaction.reply({ content: fstring });
    }
}