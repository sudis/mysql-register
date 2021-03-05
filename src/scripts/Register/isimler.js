const { MessageEmbed, Client, Message } = require("discord.js");
const settings = require("../../../config/settings.json")
const Util = require("discord-utilities")

/**
 * @param {Client} client
 * @param {Message} message
 * @param {Array<String>} args
 */
module.exports.run = async (client, message, args) => {
    if (!args[0]) return message.channel.send(`Hurra! Erkek olarak kayıt etmek için bir etiket veya ID girmelisin **${message.author.username}**.`)
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    con.query(`SELECT * FROM Names WHERE memberid = '${member.id}'`, async (err, rows) => {
        if (err) throw err;
        if (rows.length < 1) {
            let embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
            .setColor(Util.randomItem(settings.colors))
            .setDescription(`${member} üyesinin isim sorgusunu bitirdim. Toplamda \`0\` adet ismine ulaştım.

            *Bu üyenin hiç isim kayıdı yok veya MySQL veritabanında bulunmuyor.*
            `)
            message.channel.send(embed)
        } else {
            let last = await con.promise().query(`SELECT * FROM Names WHERE memberid = '${member.id}' ORDER BY pid DESC LIMIT 1`)
            let mapped = rows.map((mysql, index) => `**${index + 1}.)** **(${mysql.sex})** \`${mysql.membername}\``) 
            let guard;
            if (rows.length > 3) {
                guard = "`❌ Şüpheli!`"
            } else {
                guard = "`✅ Güvenli!`"
            }

            let embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
            .setColor(Util.randomItem(settings.colors))
            .setDescription(`${member} üyesinin isim sorgusunu bitirdim. Toplamda \`${rows.length}\` adet ismi mevcut. 

            **\`•\`** En sonuncu kayıt eden yetkili: <@${last[0][0].registerer}>
            **\`•\`** En sonuncu cinsiyet durumu: **${last[0][0].sex}**
            **\`•\`** Bu üyenin güvenilir olup olmadığı: ${guard}

            ${mapped.join("\n")}
            `)
            message.channel.send(embed) 
        }
    })

}
module.exports.conf = {
    guildOnly: true,
    level: "REGISTERER",
    enabled: true,
    cooldown: 15000,
    dbl: false,
    aliases: ["isimler","isim","adlar","önceki-isimler"]
};

module.exports.help = {
    name: 'isimleri',
    help: 'Seçilen üyenin kayıt edilen isimlerini görüntülersiniz.',
    usage: 'isimler [@Etiket/ID]',
    category: 'Register'
};

