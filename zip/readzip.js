import AdmZip from 'adm-zip'

async function readZipArchive(output) {
  try {
    const zip = new AdmZip(output);

    for (const item of zip.getEntries()) {
      // console.log(item.toString());
      console.log(item.name.toString())//only get name
    }
  } catch (e) {
    console.log(`Something went wrong. ${e}`);
  }
}

readZipArchive("./test.zip")