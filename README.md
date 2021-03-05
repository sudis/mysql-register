# MySQL - Register Bot
> Hello! I decided to make a bot. This bot is nothing complicated. The reason for this is the first time I am building a bot using MySQL. I decided to migrate all my bots and infrastructure to MySQL. This is because NoSQL can no longer meet the needs and the majority of them use NoSQL. MySQL, where we can even sort without pulling the data, is easier and more fun than other NoSQLs. **Come on, start MySQL today**.

To use MySQL, you have to install the **MySQL Community Server** first. Have a user by creating new information there, after you set it up by searching the Internet. Then install the tables I gave below on MySQL. There is a `DATABASE` you need to install before the tables.

```
CREATE  DATABASE Register;

  

CREATE  TABLE Names (

pid INT  PRIMARY  KEY AUTO_INCREMENT NOT  NULL,

memberid TEXT  CHARACTER  SET utf8 NOT  NULL,

membername TEXT  CHARACTER  SET utf8 NOT  NULL,

sex TINYTEXT CHARACTER  SET utf8 NOT  NULL,

registerer TEXT  CHARACTER  SET utf8 NOT  NULL

);

  

CREATE  TABLE Staffs (

pid INT  PRIMARY  KEY AUTO_INCREMENT NOT  NULL,

staffid TEXT  CHARACTER  SET utf8 NOT  NULL,

registerycount INT  NOT  NULL,

mancount INT  NOT  NULL,

womancount INT  NOT  NULL

);
```
Next, edit the `settings.json` file, which is a bot file. (*We recommend that you write down the account you used while installing MySQL and more.*)

```json
{

"bot": {
"token": "BOT_TOKEN_HERE",
"status": "BOT_CUSTOM_STATUS_HERE",
"botVoiceChannelID": "BOT_JOIN_CHANNEL_ID_HERE",
"prefix": "BOT_DEFAULT_PREFIX_HERE",
"otherPrefix": ["BOT_PREFIX_1", "BOT_PREFIX_2"],
"owners": ["BOT_OWNER_ID(s)"]

},

"colors": ["b0e0e6", "c0c0c0", "800000", "ffb6c1", "f0fff0", "ffebcd"],

"mysql": {
"database": "MYSQL_DATABASE",
"host": "MYSQL_HOST",
"user": "MYSQL_USER",
"password": "MYSQL_PASS"

},

"registerSettings": {
"serverId": "SERVER_ID",
"registerChannel": "REGISTERY_CHANNEL",
"tag": "YOUR_TAG",
"notTag": "YOUR_DEFAULT_tAG",
"registerRole": "REGISTERER_ROLE_ID",
"welcomeChannel": "WELCOME_CHANNEL_ID",
"rulesChannel": "RULES_CHANNEL_ID",
"manRoles": ["MAN_ROLES_ID(s)"],
"womanRoles": ["WOMAN_ROLES_ID(s)"],
"boosterRole": "BOOSTER_ROLES_ID"
}
}
```
Tada! You are now ready to start. Since the bot's main file is contained in SRC, you need to open SRC with the PowerShell or Linux Gnome Terminal.
```
nodemon main
```

Your boat is ready now! Remember, you may get a lot of errors in this project, but these are quite normal. Please come to our server calmly and ask for help. With love!

## Serendia Squad
> You are invited to our server where you can get all kinds of help and meet various friends. Do not forget to join our server with the help of the link below.

https://discord.gg/K44EZWA4kQ
