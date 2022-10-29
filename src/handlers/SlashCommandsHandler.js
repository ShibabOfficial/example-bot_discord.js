const fs = require('fs');
const client = require('../main');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

module.exports = (client) => {
  client.commandsHandler = async (commandsFolders, path) => {
    client.commandArray = [];
    for (const folder of commandsFolders) {
      const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(f => f.endsWith('.js'));
      for (const file of commandFiles) {
        const command = require(`../Commands/SlashCommands/${folder}/${file}`);
        client.commands.set(command.data.name, command);
        client.commandArray.push(command.data.toJSON());
      }
    }

    const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

    (async () => {
      try {
        await rest.put(
          Routes.applicationCommands(process.env.ID),
            { body: client.commandArray },
        );

      } catch (error) {
        console.error(error);
      }
    })();
  }
}