const { Client, Collection } = require("discord.js");
const client = new Client({ intents: [131071] });

const fs = require('fs');
require("dotenv").config();

client.commands = new Collection();
client.timeouts = new Collection();
module.exports = client;

const handlers = fs.readdirSync('./src/handlers').filter(file => file.endsWith('.js'));
const commandFolders = fs.readdirSync('./src/Commands/SlashCommands');

(async () => {
    for (const file of handlers) {
        require(`./handlers/${file}`)(client);
    }
      
    client.commandsHandler(commandFolders, './src/Commands/SlashCommands');

    client.login(process.env.TOKEN);
})();