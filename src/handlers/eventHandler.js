// Konsol tarafında renklendirme yapmayı sağlayan kütüphane sisteme dahil edildi.
require("colors");

// Dosyaların okunması için "file system" (dosya sistemi) ve "path" (dosya yolu) tanımlamaları yapıldı.
const fs = require("fs");
const path = require("path");

// Dosyaların içeriklerini kontrol edip etkinlikleri yükleyen fonksiyon tanımı yapıldı.
function loadEvents(client) {
  // Etkinliklerin yükleme aşamasında olduğunu gösteren sarı renkli uyarı mesajı.
  console.log(`\n[DURUM] Etkinlikler yükleniyor.`.yellow);

  // Etkinliklerin bulunduğu dosya dizini tanımlaması yapıldı.
  const baseEventPath = path.join(__dirname, "../events");
  const folders = fs.readdirSync(baseEventPath);

  // Klasörleri ve içindeki dosyaları tek tek gezerek sistem kontrolü yapıp çalışır halde olan etkinlikleri ayağa kaldıran ve hatalı olanları atlayan bir yapı oluşturuldu.
  for (const folder of folders) {
    const folderPath = path.join(baseEventPath, folder);
    const files = fs
      .readdirSync(folderPath)
      .filter((file) => file.endsWith(".js"));

    for (const file of files) {
      const eventPath = path.join(folderPath, file);
      const event = require(eventPath);
      const fileName = path.basename(file, path.extname(file));

      if (!event.name) {
        console.log("[EVENT]".green + ` Atlandı  >> \"${fileName}\"`.grey);
      } else {
        if (event.rest) {
          if (event.once)
            client.rest.once(event.name, (...args) =>
              event.execute(...args, client)
            );
          else
            client.rest.on(event.name, (...args) =>
              event.execute(...args, client)
            );
        } else {
          if (event.once)
            client.once(event.name, (...args) =>
              event.execute(...args, client)
            );
          else
            client.on(event.name, (...args) => event.execute(...args, client));
        }
        console.log("[EVENT]".green + ` Yüklendi >> \"${fileName}\"`);
      }
    }
  }
  return console.log("[DURUM]".yellow + ` Etkinlikler yüklendi.\n`.green);
}

module.exports = { loadEvents };
