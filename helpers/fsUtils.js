// readFromFile, writeToFile and readAndAppend functions are borrowed from mini project

const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);
//Promise version of fs.writeFile
const promisWriteToFile = util.promisify(fs.writeFile);

/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */
const writeToFile = (destination, content) =>
  promisWriteToFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
/**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

const readAndDelete = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      let parsedData = JSON.parse(data);
      for (let i = 0; i < parcedData.length; i++) {
            if (parcedData[i].note_id===content.note_id) {
               parsedData.splice(i,1);
               console.log('match found')
             }
             console.log(parcedData[i].note_id)
        
           }
      
      //parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend};
