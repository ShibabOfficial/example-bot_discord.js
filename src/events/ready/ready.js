const { ActivityType, Events } = require('discord.js')
const client = require("../../main");

const activity = [ "Something here...", ActivityType.Playing ];

client.once(Events.ClientReady, async () => {
    console.log(` ~ ${client.user.tag} is ready!`);
    client.user.setPresence({status: 'online' });
    client.user.setActivity(activity[0], { type:  activity[1]});
});