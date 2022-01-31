const { Client, Message, MessageEmbed } = require('discord.js');
const glob = require('glob');

module.exports = {
    name: 'reload',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, Discord) => {
        if(message.author.id !== '901163578906796102') return;
        client.commands.sweep(() => true)
        glob(`${__dirname}/../**/*.js`, async(err, filePaths)=> {
            if(err) return console.log(err);
            filePaths.forEach((file) => {
                delete require.cache[require.resolve(file)];

                const pull = require(file);

                if(pull.name) {
                    console.log(`Reloaded ${pull.name} (cmd)`);
                    client.commands.set(pull.name, pull);
                }

                if (pull.aliases && Array.isArray(pull.aliases)) {
                    pull.aliases.forEach((alias) => {
                        client.aliases.set(alias, pull.name);
                    });
                }

                
            });

            const msg = await message.channel.send(`🔃 Loading...`)

            await message.channel.send("Reloaded Commands!")
            msg.delete()
        });


    },
};