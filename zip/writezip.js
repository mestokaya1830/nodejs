import AdmZip from 'adm-zip'

async function createZipArchive() {
  const zip = new AdmZip();
  zip.addLocalFolder("./test");
  zip.writeZip("test.zip");
  console.log(`Created test.zip successfully`)
}

createZipArchive()