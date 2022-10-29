const { EmbedBuilder, Events } = require("discord.js");
const ms = require('ms');
const client = require('../../main');

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    const t = client.timeouts.get(`${interaction.user.id}_${command}`) || 0;
    
    const timeEmbed = new EmbedBuilder().setColor('#db1616').setTitle('**Cooldown:**').setDescription(`You have to wait: **${ms(t - Date.now())}** before executing another command!`)
    if (Date.now() - t < 0) return interaction.reply({ embeds: [timeEmbed], ephemeral: true });

    client.timeouts.set(`${interaction.user.id}_${command}`, Date.now() + (command.timeout || 0));
    
    await command.execute(interaction, client);
  } catch (err) {
    await interaction.reply({
      content: `❌ | There was an error while executing this command! \n **error:** ${err}`,
      ephemeral: true
    });
    console.log(err);
  }
});