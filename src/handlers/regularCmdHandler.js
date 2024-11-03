require("colors");

const fs = require("fs");
const path = require("path");

function loadRegularCommands(client) {
  console.log(`[DURUM] Özel komutlar yükleniyor.`.yellow);
  let regularcmdsArray = [];

  const regularPath = path.join(__dirname, "../regular-commands");
  const regularcmdFiles = fs
    .readdirSync(regularPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of regularcmdFiles) {
    const regularcmdFile = path.join(regularPath, file);
    const regularcmd = require(regularcmdFile);
    const fileName = path.basename(file, path.extname(file));

    if (!regularcmd.data.name) {
      console.log("[ÖZEL]".cyan + `  Atlandı  >> \"${fileName}\"`.gray);
      continue;
    }
    try {
      client.commands.set(regularcmd.data.name, regularcmd);
      regularcmdsArray.push(regularcmd.data);

      console.log("[ÖZEL]".cyan + `  Yüklendi >> \"${fileName}\"`);
    } catch (error) {
      console.log(`[ÖZEL]`.cyan + `  Hatalı  >> \"${file}\"`.red);
      //Hata tespiti için
      /*
      console.log(
        "[HATA]".red +  `\"${file}\"\n`.gray,
        error
      ); */
    }
  }
  return console.log("[DURUM]".yellow + ` Özel komutlar yüklendi.\n`.green);
}

module.exports = { loadRegularCommands };
