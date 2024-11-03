// Bir kullanıcı sunucuyu terk ettiği zaman belirlenen yazı kanalına bilgilendirme yazısı yazan etkinlik denetleyicisi tasarladım.
require("colors");
require("dotenv/config");

const { Events } = require("discord.js");
module.exports = {
  name: Events.GuildMemberRemove,
  once: false,
  async execute(member) {
    const channel = member.guild.channels.cache.get(process.env.PORTAL);

    try {
      await channel.send(
        `**${member.user.username}** Samanyolu Galaksisi'ne döndü.`
      );
    } catch (error) {
      console.log("[HATA]".red + `  \"${file}\"\n`.gray, error);
    }
  },
};
