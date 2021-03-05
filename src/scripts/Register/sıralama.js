const { MessageEmbed, Client, Message } = require("discord.js");
const { utc } = require("moment");
const settings = require("../../../config/settings.json")
const Util = require("discord-utilities")
/**
 * @param {Client} client
 * @param {Message} message
 * @param {Array<String>} args
 */
module.exports.run = async (client, message, args) => {
    con.query(`SELECT * FROM Staffs ORDER BY registerycount DESC LIMIT 10`, async (err, rows) => {
        if (err) throw err;
        if (rows.length < 1) {
            return message.channel.send(`Kayıt sıralamasını yapacak kadar kişiyi bulamadım.`)
        } else {
            let everyrows = await con.promise().query(`SELECT SUM(registerycount) AS total FROM Staffs LIMIT 15`)
            let mapped = rows.map((value, index) => `**${index + 1}.** <@${value.staffid}> **${value.registerycount}** (\`E: ${value.mancount} K: ${value.womancount}\`)`)
            let embed = new MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
            .setColor(Util.randomItem(settings.colors))
            .setDescription(`${message.guild.name} sunucusunda bu zamana kadar toplamda **${everyrows[0][0].total}** kayıt yapılmış. Aşağıda en yüksek kayıda sahip olan kişilerı sıraladım.

            <:tac:817358964073168926> ${mapped.join("\n")}
            `)

            message.channel.send(embed)
        }
    })

}
module.exports.conf = {
    guildOnly: true,
    level: "NONE",
    enabled: true,
    cooldown: 15000,
    dbl: false,
    aliases: ["top","sıra"]
};

module.exports.help = {
    name: 'sıralama',
    help: 'En çok kayıt yapan kişileri gösterir.',
    usage: 'sıralama',
    category: 'Register'
};

