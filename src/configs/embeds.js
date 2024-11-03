// Sunucu özelinde "Embeds" ("discord.js" kütüphanesinin özelleştirilmiş mesajları) olarak adlandırılan özel mesajların bir arada tutulduğu dosya.
require("dotenv/config");

const { EmbedBuilder } = require("discord.js");

// Yetersiz yetki ile komutu kullanan kullanıcıya gönderilecek hata mesajları.
function permModEmbed() {
  return new EmbedBuilder()
    .setColor(0x7b120a)
    .setTitle("**HATA**")
    .setDescription(
      "Bu komutu kullanmak için moderatör ya da sunucu sahibi olmasınız."
    );
}

function permAdminEmbed() {
  return new EmbedBuilder()
    .setColor(0x7b120a)
    .setTitle("**HATA**")
    .setDescription("Bu komutu sadece sunucu sahibi kullanabilir!");
}

function permDevEmbed() {
  return new EmbedBuilder()
    .setColor(0x7b120a)
    .setTitle("**HATA**")
    .setDescription("Bu komut şu anda geliştiriciye özeldir.");
}

// Yasaklama komutu bilgilendirme mesajı.
function banEmbed(member, reason, usedBy) {
  return new EmbedBuilder()
    .setColor(0x7b120a)
    .setTitle("**YASAKLANDI**")
    .setDescription(
      `**Kullanıcı:** ${member}
      **ID:** ${member.id}
      **Sebep:** ${reason}
      **Yapan:** ${usedBy}
      **Zaman:** ${new Date().toLocaleString()}`
    );
}

// Bağlantı kesme komutu bilgilendirme mesajı.
function dcMemberEmbed(member, usedBy) {
  return new EmbedBuilder()
    .setColor(0x0095b6)
    .setTitle("**BAĞLANTISI KESİLDİ**")
    .setDescription(
      `**Kullanıcı:** ${member}
      **Yapan:** ${usedBy}
      **Zaman:** ${new Date().toLocaleString()}`
    );
}

module.exports = {
  permModEmbed,
  permAdminEmbed,
  permDevEmbed,
  banEmbed,
  dcMemberEmbed,
};
