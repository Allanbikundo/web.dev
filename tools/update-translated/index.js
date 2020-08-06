/**
 * @fileoverview Task for updating `updated` YAML field.
 * Run this command while you have dirty files and it will update their
 * `updated` YAML field.
 *
 * Example: npm run updated && git commit -am 'Updated some blog posts'
 *
 */

const fs = require('fs').promises;
const path = require('path');
// const moment = require('moment');


// const chalk = require('chalk');

// const moment = require('moment');
// const util = require('util');
// const exec = util.promisify(require('child_process').exec);


const RE_UPDATED = /^translated:\s?(.*?)\n/m;
// const MSG_UPDATE = `Updated ${chalk.bold('updated')} in`;



const translatedFileRegExp = /site\/content\/(?!en).*\/(.*)\.md/;

function isTranslatedFile(fileName) {
  return fileName.match(translatedFileRegExp);
};

const run = async () => {
  console.log('omg im running');
  console.log('process.argv0', process.argv.slice(2)[0]);
  const fileNames = process.argv.slice(2)[0].slice(1, -1).split(',');

  console.log('files', fileNames);
  const translatedFiles = fileNames.filter(isTranslatedFile);
  console.log('translatedFiles', translatedFiles);
  console.log('__dirname', __dirname);

  // const translatedfiles = process.argv.files.filter(isTranslatedFile);
  // console.log('files', process.argv.files);

  for (const fileName of translatedFiles) {
    // const now = moment().format('YYYY-MM-DD');
    const now = '2020-20-20';
    let originalTranslated;
    let newTranslated;


    const changedFile = path.join(__dirname, '../..', fileName);
    const fileContents = await fs.readFile(changedFile, 'utf-8');
    const matched = RE_UPDATED.exec(fileContents);
    if (!matched) {
      // Updated YAML property is not in the file - nothing to do.
      console.log(
        `Did not find translated field in ${changedFile}.`,
      );
      originalTranslated = '\n---\n';
      newTranslated = `\ntranslated: ${now}\n---\n`;
    } else {
      originalTranslated = matched[0];
      newTranslated = `translated: ${now}\n`;
    }

    const newContents = fileContents.replace(originalTranslated, newTranslated);
    await fs.writeFile(changedFile, newContents);

    // Add the file to the current commit.
    // await exec(`git add ${changedFile}`);
    // console.log(`${MSG_UPDATE} ${chalk.cyan(changedFile)}`);
  }



};

run();
