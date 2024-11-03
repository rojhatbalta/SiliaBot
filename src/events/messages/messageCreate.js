require("colors");

const { Events } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  once: false,
  async execute(message) {
    // "!" ile başlayan mesajın komut olup olmadığını kontrol ediyor.
    if (!message.content.startsWith("!") || message.author.bot) return;

    // Regular commands check part
    const args = message.content.slice(1).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = message.client.commands.get(commandName);
    // Eğer komut bulunamazsa çalışmayı engellememek adına geri dönüş sağlıyor.
    if (!command) return;

    try {
      command.execute(message, args); // Geçerli komutu çalıştırır.
    } catch (error) {
      // Hata alırsa terminale ve sunucuda komutu kullanan kişiye özel bilgilendirme mesajları yazar.
      console.error("[HATA]".red + `  \"${file}\"\n`.gray, error);
      message.reply({
        content:
          "Bu komutu çalıştırırken bir hata oluştu! Lütfen geliştirici ile iletişime geçin.",
        ephemeral: true,
      });
    }

    // Seviye sistemi için tecrübe puanları eklenecek (yakında)
  },
};
