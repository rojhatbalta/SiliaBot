// Konsol tarafında renklendirme yapmayı sağlayan kütüphane sisteme dahil edildi.
require("colors");

// Dosyaların okunması için "file system" (dosya sistemi) ve "path" (dosya yolu) tanımlamaları yapıldı.
const fs = require("fs");
const path = require("path");

// Dosyaların içeriklerini kontrol edip komutları yükleyen fonksiyon tanımı yapıldı.
function loadCommands(client) {
  // Komutların yükleme aşamasında olduğunu gösteren sarı renkli uyarı mesajı.
  console.log(`[DURUM] Komutlar yükleniyor.`.yellow);
  let commandsArray = [];

  // Komutların bulunduğu dosya dizini tanımlaması yapıldı.
  const baseCommandPath = path.join(__dirname, "../commands");
  const cmdFolder = fs.readdirSync(baseCommandPath);

  // Klasörleri ve içindeki dosyaları tek tek gezerek sistem kontrolü yapıp çalışır halde olan komutları ayağa kaldıran ve hatalı olanları atlayan bir yapı oluşturuldu.
  for (const folder of cmdFolder) {
    const folderPath = path.join(baseCommandPath, folder);
    const commandFiles = fs
      .readdirSync(folderPath)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const commandPath = path.join(folderPath, file);
      const commandFile = require(commandPath);
      const fileName = path.basename(file, path.extname(file));

      try {
        client.commands.set(commandFile.data.name, commandFile);

        commandsArray.push(commandFile.data.toJSON());

        console.log("[KOMUT]".blue + ` Yüklendi >> \"${fileName}\"`);
        continue;
      } catch (error) {
        console.log("[KOMUT]".blue + ` Atlandı  >> \"${fileName}\"`.gray);
        //Hata tespiti için
        /*
        console.log(
          "[HATA]".red + `\"${file}\" dosyasında bir hata bulundu:\n`,
          error
        );*/
      }
    }
  }

  // Sunucu tarafında komutların çalışır hale getirilmesi sağlandı.
  client.application.commands.set(commandsArray);

  // Uyarı mesajı ile durum güncellemesi konsol ekranında bildirildi.
  return console.log("[DURUM]".yellow + ` Komutlar yüklendi.\n`.green);
}

module.exports = { loadCommands };
