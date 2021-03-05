const { MessageEmbed, Client, Message } = require("discord.js");
const settings = require("../../../config/settings.json")
const Util = require("discord-utilities")

/**
 * @param {Client} client
 * @param {Message} message
 * @param {Array<String>} args
 */
module.exports.run = async (client, message, args) => {
    if (!args[0]) return message.channel.send(`Hurra! Tekrar kayıt etmek için bir etiket veya ID girmelisin **${message.author.username}**.`)
    if (!args[1]) return message.channel.send(`Hurra! Tekrar kayıt etmek için bir cinsiyet girmelisin **${message.author.username}**.`)
    if (!args[1]) return message.channel.send(`Hurra! Tekrar kayıt etmek için bir isim girmelisin **${message.author.username}**.`)

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (member.user.bot) return message.channel.send(`Hurra! Bir botu tekrar kayıt edemezsin **${message.author.username}**.`)
    if(message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(`Hurra! Tekrar kayıt etmeye çalıştığın kişinin rol hiyerarşisi senden yüksek **${message.author.username}**.`)
    let name = Util.toProperCase(args.slice("2").join(" "))

    if (args[1] === "kadın" || args[1] === "k" || args[1] === "Kadın") {
        if (member.user.username.includes(settings.registerSettings.tag)) {
            member.setNickname(`${settings.registerSettings.tag} ${name}`)
        } else {
            member.setNickname(`${settings.registerSettings.notTag} ${name}`)
        }

        con.query(`SELECT * FROM Names WHERE memberid = '${member.id}' ORDER BY pid ASC LIMIT 1`, (err, rows) => {
            if (err) throw err;
            if (rows.length < 1) {
                message.channel.send(`Hurra! Bu üyenin kayıt verisini bulamadım veya *MySQL* veritabanında bu üye kayıtlı değil **${message.author.username}**.`)
                return
            } else {
                member.roles.cache.has(settings.registerSettings.boosterRole) ? member.roles.set(settings.registerSettings.womanRoles.concat(settings.registerSettings.boosterRole)) : member.roles.set(settings.registerSettings.womanRoles);
                con.query(`UPDATE Names SET membername = '${name}' WHERE memberid = '${member.id}' ORDER BY pid DESC LIMIT 1`)
                con.query(`UPDATE Names SET sex = 'K' WHERE memberid = '${member.id}' ORDER BY pid DESC LIMIT 1`)
                return message.channel.send(`${member} üyesini başarıyla tekrar kayıt ettim. Ayrıca MySQL veritabanını düzenledim.`)
            }
        })
    }

    if (args[1] === "erkek" || args[1] === "e" || args[1] === "Erkek") {
        if (member.user.username.includes(settings.registerSettings.tag)) {
            member.setNickname(`${settings.registerSettings.tag} ${name}`)
        } else {
            member.setNickname(`${settings.registerSettings.notTag} ${name}`)
        }

        con.query(`SELECT * FROM Names WHERE memberid = '${member.id}' ORDER BY pid ASC LIMIT 1`, (err, rows) => {
            if (err) throw err;
            if (rows.length < 1) {
                message.channel.send(`Hurra! Bu üyenin kayıt verisini bulamadım veya *MySQL* veritabanında bu üye kayıtlı değil **${message.author.username}**.`)
                return
            } else {
                member.roles.cache.has(settings.registerSettings.boosterRole) ? member.roles.set(settings.registerSettings.manRoles.concat(settings.registerSettings.boosterRole)) : member.roles.set(settings.registerSettings.manRoles);
                con.query(`UPDATE Names SET membername = '${name}' WHERE memberid = '${member.id}' ORDER BY pid DESC LIMIT 1`)
                con.query(`UPDATE Names SET sex = 'K' WHERE memberid = '${member.id}' ORDER BY pid DESC LIMIT 1`)
                return message.channel.send(`${member} üyesini başarıyla tekrar kayıt ettim. Ayrıca MySQL veritabanını düzenledim.`)
            }
        })
    }
}
module.exports.conf = {
    guildOnly: true,
    level: "REGISTERER",
    enabled: true,
    cooldown: 15000,
    dbl: false,
    aliases: ["düzelt","yeniden-kayıt","düzenleme","yk"]
};

module.exports.help = {
    name: 'düzeltme',
    help: 'Bir kişinin ismi veya rolü yanlış kaydedilmişse düzeltmeye yarar.',
    usage: 'düzelt [@Etiket/ID] [Erkek/Kadın/E/K] [İsim ve Yaşı]',
    category: 'Register'
};

