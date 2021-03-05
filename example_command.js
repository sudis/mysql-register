const { MessageEmbed, Client, Message } = require("discord.js");
const settings = require("../../../config/settings.json")


/**
 * @param {Client} client
 * @param {Message} message
 * @param {Array<String>} args
 */
module.exports.run = async (client, message, args) => {

}
module.exports.conf = {
    guildOnly: true,
    level: "",
    enabled: true,
    cooldown: 0,
    dbl: false,
    aliases: [""]
};

module.exports.help = {
    name: '',
    help: '',
    usage: '',
    category: ''
};

