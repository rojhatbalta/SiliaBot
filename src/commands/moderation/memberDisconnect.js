// Moderatör ve admin yetkisiyle bir kullanıcıyı bulunduğu sesli iletişim kanalından atan "/" ( slash ) komutu.

// Terminalde renklendirme için "colors", hassas bilgilerin (sunucu ID'si, rol ID'si, gibi) maskelenmesi için "dotenv/config" dosyaları sisteme dahil edildi.
require("colors");
require("dotenv/config");

// Slash komutları için "discord.js", yetki kontrolü için "checkPerms", log mesajları için "embeds" dosyaları dahil edildi.
const { SlashCommandBuilder } = require("discord.js");
const { modAndAdmin } = require("../../configs/checkPerms");
const { dcMemberEmbed } = require("../../configs/embeds");

module.exports = {
  // Komut ve elemanlarının tanımlaması
  data: new SlashCommandBuilder()
    .setName("dc-member")
    .setDescription(
      "[MODERATÖR] İsteğe bağlı olarak belirtilen kullanıcının ses bağlantısını keser."
    )
    .addUserOption((option) =>
      option
        .setName("hedef")
        .setDescription("Sesliden atılacak kişiyi seçin")
        .setRequired(true)
    ),

  // Komutun gerçekleştirildiği kısım
  async execute(interaction) {
    modAndAdmin(interaction);

    const member = interaction.options.getMember("hedef");

    if (!member) {
      return interaction.reply("Lütfen atılacak kullanıcıyı belirtin!");
    }

    // Kullanıcı bir sesli kanalda ise bulunduğu sesli kanaldan bağlantısını keser ve log yazı kanalına bilgilendirme mesajı yazar.
    try {
      const memberVoice = member.voice;
      const usedBy = interaction.user;
      const logChannel = interaction.guild.channels.cache.get(process.env.LOG);
      if (memberVoice.channelId) {
        await memberVoice.disconnect();
        await logChannel.send({ embeds: [dcMemberEmbed(member, usedBy)] });
        await interaction.reply({
          content: `${member} sesli kanaldan çıkarıldı.`,
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: `${member} sesli kanalda değil.`,
          ephemeral: true,
        });
      }
    } catch (error) {
      // Hata bilgilendirme kısmı.
      console.error("[HATA]".red + `  \"${file}\"\n`.gray, error);
      interaction.reply({
        content: `${member} sesli kanaldan çıkarılırken bir hata oluştu.`,
        ephemeral: true,
      });
    }
  },
};
