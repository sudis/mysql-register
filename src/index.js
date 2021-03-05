const { Collection, MessageEmbed, Client, WebhookClient } = require('discord.js');
const Discord = require("discord.js")
const client = new Client();
require('../src/loaders/eventLoader')(client);
const moment = require('moment');
const fs = require('fs');
const config = require("../config/settings.json")
const cli = require("cli-color");
const { settings } = require('cluster');
const mysql = require("mysql2")
const load = cli.green.bold
const bgLoad = cli.bgWhite.black
const cmds = cli.yellow
const token = cli.cyan
const error = cli.redBright
const roles = cli.blackBright
const loading = cli.greenBright
const { Webhook } = require('discord-webhook-node');
const duration = require("moment-duration-format")
moment.locale("TR")

const log = message => {
    console.log(bgLoad(`[${moment().format("YYYY-MM-DD HH:mm:ss")}]`) + ` ${message}`);
};

client.commands = new Collection();
client.aliases = new Collection();
fs.readdir("../src/scripts/", (err, files) => {
    if (err) console.error(err);
    files.forEach(f => {
        fs.readdir(`../src/scripts/${f}/`, (err, filess) => {
            if (err) console.error(err);
            log(load(`${filess.length} command will be loaded from src/scripts/${f} folder.`));
            filess.forEach(fs => {
                let props = require(`../src/scripts/${f}/${fs}`);
                log(cmds(`Loaded: ${props.help.name}.`));
                client.commands.set(props.help.name, props);
                props.conf.aliases.forEach(alias => {
                    client.aliases.set(alias, props.help.name);
                });
            });
        });
    });
});

client.numbersize = function m(n){var x=(''+n).length,p=Math.pow, d=1;d=p(10,d);x-=x%3;return Math.round(n*d/p(10,x))/d+" KMGTPE"[x/3].replace(/ /g, '')}

const con = global.con = mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
})

con.connect(err => {
    if (err) throw err;
    console.log(bgLoad(`[${moment().format("YYYY-MM-DD HH:mm:ss")}]`) + token(` Successfully connected to MySQL database.`))
})
client.login(config.bot.token).then(() => {
    console.log(bgLoad(`[${moment().format("YYYY-MM-DD HH:mm:ss")}]`) + token(` Successfully connected to the token.`));
}).catch((err) => {
    console.log(bgLoad(`[${moment().format("YYYY-MM-DD HH:mm:ss")}]`) + error(` Couldn't connect to token! ${err}`));
});

client.on("guildMemberAdd", async (member) => {
    let channel = client.channels.cache.get(config.registerSettings.welcomeChannel)
    let server = client.guilds.cache.get(config.registerSettings.serverId)
    let regchannel = client.channels.cache.get(config.registerSettings.registerChannel)
    let ruleschannel = client.channels.cache.get(config.registerSettings.rulesChannel)
    let servo = (Date.now() - member.createdTimestamp) / (1000*60*60*24*1)
    let security;
    if (servo < 15) {
        security = `#ŞÜPHELİ`
    } else {
        security = `#GÜVENLİ`
    }
    
    await channel.send(`
<:lale:812619229106798622> **Selam ${member} hoş geldin! Umarım iyi vakit geçirirsin.** <:lale:812619229106798622>

**\`•\`** Bu hesap ${moment(member.createdAt).format("DD MMMM YYYY HH:mm:ss")} tarihinde kuruldu. (\`${moment.duration(Date.now()-member.createdTimestamp).format("d")} gün önce.\` \`${security}\`)

**\`•\`** \`${regchannel.name}\` kanallarından birisine ses teyidi vererek kayıdını tamamlayabilirsin.

**\`•\`** ${ruleschannel} kanalını okumayı unutma. Sunucuya katılan herkesin kuralları okuduğu kabul edilecektir.
    `)
})




