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

module.exports = {
  permModEmbed,
  permAdminEmbed,
  permDevEmbed,
};
