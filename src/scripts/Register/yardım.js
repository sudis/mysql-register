const { MessageEmbed, Client, Message } = require("discord.js");
const settings = require("../../../config/settings.json")
const client = new Client();
const Util = require("discord-utilities")

/**
 * @param {Client} client
 * @param {Message} message
 * @param {Array<String>} args
 */
module.exports.run = async (client, message, args) => {

    let filtered = client.commands.filter(x => x.help.category === "Register")
    let map = filtered.map((value, index) => `**KOMUT:** \`${value.help.name}\` \nHakkında: ${value.help.help} \nKullanım: \`${value.help.usage}\``)

    let embed = new MessageEmbed()
    .setAuthor(client.user.tag, client.user.avatarURL({dynamic: true}))
    .setColor(Util.randomItem(settings.colors))
    .setDescription(`Selam! Ben Kayıtçı **\`Sude\`**. Beni yapan \`Serendia Squad\`'a teşekkür ediyorum. Unutma bu projeyi etrafta izinsiz bir şekilde paylaşmak yasaktır. Lütfen izin alarak paylaş! Bu botta toplamda **${filtered.size}** komut bulunmakta.
    
    ${map.join("\n\n")}
    `)
    message.channel.send(embed)

}
module.exports.conf = {
    guildOnly: true,
    level: "REGISTERER",
    enabled: true,
    cooldown: 30000,
    dbl: false,
    aliases: ["y","help","h"]
};

module.exports.help = {
    name: 'yardım',
    help: 'Botta bulunan bütün komutları gösterir.',
    usage: 'yardım',
    category: 'Register'
};

