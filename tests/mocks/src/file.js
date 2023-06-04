const { readFile } = require("fs/promises");
const path = require("path");
const { error } = require("./constants");

const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"],
};

class File {
  static async csvToJson(filePath) {
    const formatedFilePath = path.join(__dirname, filePath);
    const content = await readFile(formatedFilePath, "utf8");
    const validation = this.isValid(content);

    if (validation.valid == false) throw new Error(validation.error);

    return this.parseCsvToJson(content);
  }

  static isValid(csvString, options = DEFAULT_OPTIONS) {
    const [headers, ...fileWithoutHeaders] = csvString.split(/\r?\n/);
    const isValidHeader = headers === options.fields.join(",");

    if (!isValidHeader) {
      return {
        error: error.FILE_INVALID_FIELDS,
        valid: false,
      };
    }

    if (
      fileWithoutHeaders.length === 0 ||
      fileWithoutHeaders.length > options.maxLines
    ) {
      return {
        error: error.FILE_INVALID_LENGTH,
        valid: false,
      };
    }

    return { valid: true };
  }

  static parseCsvToJson(csvString) {
    const lines = csvString.split(/\r?\n/);
    const firstLine = lines.shift();
    const header = firstLine.split(",");

    const users = lines.map((line) => {
      const columns = line.split(",");
      let user = {};
      for (const index in columns) {
        user[header[index]] = columns[index].trim();
      }
      return user;
    });
    return users;
  }
}

module.exports = File;
