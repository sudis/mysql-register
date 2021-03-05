const { Message, MessageEmbed, Collection } = require("discord.js");
const settings = require("../../config/settings.json")
let cooldown = new Map();
const Discord = require("discord.js")


/**
 * @param {Message} message
 */
module.exports = async (message) => {
    let prefix = settings.bot.prefix
    let client = message.client;
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
  
    const prefixler = settings.bot.otherPrefix
    if(prefixler && prefixler.length >= 1) {
    prefixler.some(c => {
    if(message.content.startsWith(c)) prefix = c;
    });
    };
  
    if (message.content.startsWith(prefix)) {
    var command;
    var params;
    if(prefix.includes(' ')) {
    command = message.content.split(' ')[1];
    params = message.content.split(' ').slice(2);
    } else {
    command = message.content.split(' ')[0].slice(prefix.length);
    params = message.content.split(' ').slice(1);
    }
}
    
    let perms = elevation(message);
    let cmd;
    if (client.commands.has(command)) {
        cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
    }
    if (cmd) {
        if (cmd.conf.level === "BOT_OWNERS") {
            if (settings.bot.owners.some(id => message.author.id !== id)) {
                return message.channel.send("Sorry, your authorization level is too **low**. You need at least **`Bot Owner`** authority to run this type of command.")
            }
        }

        if (cmd.conf.level === "BOT_MODERATORS") {
           if (settings.bot.moderators.some(id => message.author.id !== id) || settings.bot.owners.some(id => message.author.id !== id)) {
    return message.channel.send("Sorry, your authorization level is too **low**. You need at least **`Bot Moderator`** authority to run this type of command.")
            }
       }

       if (cmd.conf.level === "ADMINISTRATOR") {
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send("Sorry, your authorization level is too **low**. You need at least **`Administrator`** authority to run this type of command.")
        }
    }

    if (cmd.conf.level === "BAN_MEMBERS") {
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.channel.send("Sorry, your authorization level is too **low**. You need at least **`Ban Members`** authority to run this type of command.")
        }
    }

    if (cmd.conf.level === "KICK_MEMBERS") {
        if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.channel.send("Sorry, your authorization level is too **low**. You need at least **`Kick Members`** authority to run this type of command.")
        }
    }

    if (cmd.conf.level === "MANAGE_MESSAGES") {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send("Sorry, your authorization level is too **low**. You need at least **`Manage Messages`** authority to run this type of command.")
        }
    }

    if (cmd.conf.level === "REGISTERER") {

        if(!message.member.hasPermission("BAN_MEMBERS") && !message.member.roles.cache.has(settings.registerSettings.registerRole)) {
            return message.channel.send(new MessageEmbed().setAuthor("Yetersiz Yetkilendirme Seviyesi").setDescription(`**\`»\`** Bu komutu kullanabilmen için en az \`Yönetici\` yetkisine denk bir rolün veya \`${message.guild.roles.cache.get(settings.registerSettings.registerRole).name}\` adındaki role sahip olmak zorundasın.`).setColor("RED")).then(x => x.delete({timeout:6500}));
        }
    }

        if (cmd.conf.enabled === false[0]) {
            return message.channel.send(`Bu komut şu anda **herkes** için kullanıma **kapalı**. Lütfen daha sonra tekrar dene!`).then(x => x.delete({timeout: 5000}))
        }

        if (cmd.conf.enabled === false[1]) {
            if(!message.author.id.includes(settings.botSettings.owners)) {
                return message.channel.send(`Bu komut şu anda **üyeler** için kullanıma **kapalı**. Lütfen daha sonra tekrar dene!`).then(x => x.delete({timeout: 5000}))
            }
        }

        if (settings.bot.owners.some(id => message.author.id !== id)) {
        if(cooldown.has(message.author.id) && cooldown.get(message.author.id).komut == cmd.help.name && cooldown.get(message.author.id).zaman > Date.now()) return message.channel.send(`Sakinleş **${message.author.username}**! \`${cmd.help.name}\` komutunu kullanabilmek için **${Math.floor((cooldown.get(message.author.id).zaman - Date.now()) / 1000)} saniye beklemelisin.`);
        cooldown.set(message.author.id, {komut: cmd.help.name, zaman: Date.now() + cmd.conf.cooldown});
    }
      
        if (perms < cmd.conf.permLevel) return;
        cmd.run(client, message, params, perms);
    }
};

function elevation(message) {
    if (!message.guild) return;
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === settings.bot.owners) permlvl = 4;
    return permlvl;
};