// Komutların yetkilendirilmesi için gerekli düzenleme dosyası.
const { permModEmbed, permAdminEmbed, permDevEmbed } = require("./embeds");

// Moderatör ve Admin yetki kontrolü.
function modAndAdmin(interaction) {
  if (
    !interaction.member.roles.cache.has(process.env.MOD || process.env.ADMIN)
  ) {
    return interaction.reply({ embeds: [permModEmbed()], ephemeral: true });
  }
}

// Admin yetki kontrolü
function onlyAdmin(interaction) {
  if (!interaction.member.roles.cache.has(process.env.ADMIN)) {
    return interaction.reply({ embeds: [permAdminEmbed()], ephemeral: true });
  }
}

// Geliştirici yetki kontrolü
function onlyDev(interaction) {
  if (!interaction.member.roles.cache.has(process.env.DEV1)) {
    return interaction.reply({ embeds: [permDevEmbed()], ephemeral: true });
  }
}
module.exports = { modAndAdmin, onlyAdmin, onlyDev };
