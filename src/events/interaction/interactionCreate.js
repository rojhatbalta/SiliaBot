require("colors");

const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.command.name);
      if (!command) {
        console.log(
          `[HATA] ${interaction.command.name} komutu bulunamadı.`.red
        );
        return;
      }
      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(
          "[HATA]".red +
            ` "${interaction.commandName}" komutu çalıştırılırken hata oluştu.\n`
              .gray,
          error
        );
      }
    }
  },
};
