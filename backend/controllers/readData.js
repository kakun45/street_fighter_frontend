const fs = require("fs");

const readJsonData = (filename) => {
  // WARNING! only one "dot/<path>" is relative to server that routs on data, bc we call it from script.js, not from here. <filename> needs .json extention provided
  return JSON.parse(fs.readFileSync(`./data/${filename}`));
};

module.exports = { readJsonData };
