import AdmZip from 'adm-zip'
import fs from 'node:fs/promises'

async function updateZipArchive(outputfile) {
  try {
    const zip = new AdmZip(outputfile);

    const content = await fs.readFile('./myself.jpg');
    zip.addFile('myself.jpg', content);
    zip.writeZip(outputfile);
    console.log(`Updated successfully`);
  } catch (err) {
    console.log(err)
  }
}

updateZipArchive("./test.zip");