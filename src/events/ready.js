const {Client} = require("discord.js");
const config = require("../../config/settings.json")
const { WebhookClient, MessageEmbed } = require("discord.js")

module.exports = async (client) => {
    await client.user.setPresence({ activity: { name: config.bot.status }, status: "dnd" });
    let channel = client.channels.cache.get(config.bot.botVoiceChannelID);
    if(channel) channel.join();

}