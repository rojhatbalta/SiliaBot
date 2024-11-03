// Terminal için "colors", hassas bilgiler için "dotenv" kütüphaneleri bu bölüme eklenmdi.
require("colors");
require("dotenv/config");

// Uygulama etkinlikleri için "discord.js" ve veritabanı bağlantısı için "mongoose" kitiphaneleri dahil edildi.
const { Events } = require("discord.js");
const mongoose = require("mongoose");
const mongoURL = process.env.MONGO_URL;

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    //Sunucu bağlantısı sağlandı.
    const guild = client.guilds.cache.get(process.env.GUILD);

    //Ön ayarlama için sunucudaki kişiler belleğe yüklendi.
    await guild.members.fetch();
    console.log(
      "[DURUM]".yellow + ` ${guild.name} üyeleri önbelleğe alındı.`.cyan
    );
    console.log(
      "[DURUM]".yellow + ` ${client.user.username} artık aktif!`.blue
    );

    //Veritabanı bağlantısı sağlandı.
    if (!mongoURL) return;
    mongoose.set("strictQuery", true);

    if (await mongoose.connect(mongoURL)) {
      console.log("[DURUM]".yellow + ` Veritabanına bağlandı!\n`.green);
    }
  },
};
