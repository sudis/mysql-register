const reqEvent = (event) => require(`../../src/events/${event}`);
module.exports = client => {
    client.on('ready', () => reqEvent('ready')(client));
    client.on('message', reqEvent('message'));
    client.on('guildMemberAdd', reqEvent('guildMemberAdd'));
};
