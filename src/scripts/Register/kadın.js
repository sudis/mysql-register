const { MessageEmbed, Client, Message } = require("discord.js");
const settings = require("../../../config/settings.json")
const Util = require("discord-utilities")


/**
 * @param {Client} client
 * @param {Message} message
 * @param {Array<String>} args
 */
module.exports.run = async (client, message, args) => {
    if (!args[0]) return message.channel.send(`Hurra! Kadın olarak kayıt etmek için bir etiket veya ID girmelisin **${message.author.username}**.`)
    if (!args[1]) return message.channel.send(`Hurra! Kadın olarak kayıt etmek için bir isim girmelisin **${message.author.username}**.`)

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (member.user.bot) return message.channel.send(`Hurra! Bir botu kayıt edemezsin **${message.author.username}**.`)
    if(message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send(`Hurra! Kayıt etmeye çalıştığın kişinin rol hiyerarşisi senden yüksek **${message.author.username}**.`)
    let name = Util.toProperCase(args.slice("1").join(" "))

    if (member.user.username.includes(settings.registerSettings.tag)) {
        member.setNickname(`${settings.registerSettings.tag} ${name}`)
    } else {
        member.setNickname(`${settings.registerSettings.notTag} ${name}`)
    }

    member.roles.cache.has(settings.registerSettings.boosterRole) ? member.roles.set(settings.registerSettings.womanRoles.concat(settings.registerSettings.boosterRole)) : member.roles.set(settings.registerSettings.womanRoles);
 
    con.query(`SELECT * FROM Names WHERE memberid = '${member.id}'`, async (err, rows) => {
        if (err) throw err;
        if (rows.length < 1) {
            let embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
            .setColor(Util.randomItem(settings.colors))
            .setDescription(`${name} üyesini **kadın** olarak kayıt ettin ${message.author}.

            __**Önceki İsimleri**__ (\`0\`)
            *Bu üye daha önce hiç kayıt olmamış veya isim kayıdı MySQL veritabanında kayıtlı değil.*
            `)

            message.channel.send(embed)
        } else {
            let mapped = rows.map((value, index) => `**\`•\` [${value.sex}]  ${index + 1}.** \`${value.membername}\``)
            let embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
            .setColor(Util.randomItem(settings.colors))
            .setDescription(`${name} üyesini **kadın** olarak kayıt ettin ${message.author}. Bu üyenin **${rows.length}** tane isim kayıdına ulaştım.

            __**Önceki İsimleri**__ (\`${rows.length}\`)
            ${mapped.join("\n")}
            `)
            message.channel.send(embed)
        }

        con.query(`INSERT INTO Names (memberid, membername, sex, registerer) VALUES ('${member.id}', '${name}', 'K', '${message.author.id}')`)

        con.query(`SELECT * FROM Staffs WHERE staffid = '${message.author.id}'`, (err, rows) => {
            if (err) throw err;
            let sql;
            if (rows.length < 1) {
                sql = `INSERT INTO Staffs (staffid, registerycount, mancount, womancount) VALUES ('${message.author.id}', 1, 0, 1)`
                con.query(sql)
            } else {
                let total = rows[0].registerycount //  zaman ayarlamaları falan da var 
                let woman = rows[0].womancount
                sql = `UPDATE Staffs SET registerycount = ${total + 1}`
                sql2 = `UPDATE Staffs SET womancount = ${woman + 1}`
                con.query(sql)
                con.query(sql2)
            }
        })
    })
} 
module.exports.conf = {
    guildOnly: true,
    level: "REGISTERER",
    enabled: true,
    cooldown: 15000,
    dbl: false,
    aliases: ["k","woman"]
};

module.exports.help = {
    name: 'kadın',
    help: 'Seçilen üyeyi kadın olarak kayıt eder.',
    usage: 'kadın [@Etiket/ID] [<isim>]',
    category: 'Register'
};

