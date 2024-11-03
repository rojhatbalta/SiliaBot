// Moderatör ve admin yetkisiyle bir kullanıcıyı sunucudan yasaklayan "/" ( slash ) komutu.

// Terminalde renklendirme için "colors", hassas bilgilerin (sunucu ID'si, rol ID'si, gibi) maskelenmesi için "dotenv/config" dosyaları sisteme dahil edildi.
require("colors");
require("dotenv/config");

// Slash komutları için "discord.js", yetki kontrolü için "checkPerms", log mesajları için "embeds" dosyaları dahil edildi.
const { SlashCommandBuilder } = require("discord.js");
const { modAndAdmin } = require("../../configs/checkPerms");
const { banEmbed } = require("../../configs/embeds");

module.exports = {
  // Komut ve elemanlarının tanımlaması
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("[MODERATÖR] Belirtilen kullanıcıyı yasaklar.")
    .addUserOption((option) =>
      option
        .setName("hedef")
        .setDescription("Yasaklanacak kişiyi seçin")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("sebep")
        .setDescription("Yasaklama sebebini belirtin")
        .setRequired(true)
    ),

  // Komutun gerçekleştirildiği kısım
  async execute(interaction) {
    modAndAdmin(interaction);

    const member = interaction.options.getMember("hedef");
    const reason = interaction.options.getString("sebep") || "Belirtilmedi";
    const usedBy = interaction.user;
    const logChannel = interaction.guild.channels.cache.get(process.env.LOG);

    if (!member) {
      return interaction.reply("Lütfen yasaklanacak kullanıcıyı belirtin!");
    }

    // Kullanıcının yasaklanabilirlik kontrolü. Rol hiyerarşisinde kendisinden yüksek kullanıcı ve admin yasaklanamıyor bu sayede.
    if (!member.bannable) {
      return interaction.reply("Belirtilen kullanıcı yasaklanamaz!");
    }

    // Kullanıcı yasaklandığı zaman log yazı kanalına bilgilendirme amaçlı bir embed mesajı gönderiliyor.
    try {
      await member.ban({ reason });
      logChannel.send({ embeds: [banEmbed(member, reason, usedBy)] });
      interaction.reply("Kullanıcı başarıyla yasaklandı.");
    } catch (error) {
      // Hata bilgilendirme kısmı.
      console.error("[HATA]".red + `  \"${file}\"\n`.gray, error);
      interaction.reply({
        content: "Kullanıcı yasaklanırken bir hata oluştu!",
        ephemeral: true,
      });
    }
  },
};
