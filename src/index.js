// Hassas bilgiler (bağlantı için kullanılan token,kanal ve rol ID'leri) için ".env" maskelemesi kullanıyorum.
require("dotenv/config");

// Gerekli yapılar "discord.js" kütüphanesinden çağırıldı.
const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");

// Etkinlikler, standart ve özel komutlar bulundukları dosya konumuna göre tanımlandı.
const { loadEvents } = require("./handlers/eventHandler");
const { loadCommands } = require("./handlers/commandHandler");
const { loadRegularCommands } = require("./handlers/regularCmdHandler");

const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
  partials: [Object.keys(Partials)],
});

// Standart ve özel komutların çalışır hale gelmesi için koleksiyonlar tanımlandı.
client.commands = new Collection();
client.regularCommands = new Collection();

// Sunucu bağlantısını kurup "handlers" klasörünü çalıştırarak tüm sistemi ayağa kaldırıyor.
client.login(process.env.TOKEN).then(() => {
  loadEvents(client);
  loadCommands(client);
  loadRegularCommands(client);
});
