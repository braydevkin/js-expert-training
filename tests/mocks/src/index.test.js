const File = require("./file");
const { error } = require("./constants");
const assert = require("assert");

(async () => {
  {
    const filePath = "./scenes/emptyFile-invalid.csv";
    const expected = new Error(error.FILE_INVALID_LENGTH);
    const result = File.csvToJson(filePath);
    await assert.rejects(result, expected);
  }
  {
    const filePath = "./scenes/invalid-header.csv";
    const expected = new Error(error.FILE_INVALID_FIELDS);
    const result = File.csvToJson(filePath);
    await assert.rejects(result, expected);
  }
  {
    const filePath = "./scenes/five-items-invalid.csv";
    const expected = new Error(error.FILE_INVALID_LENGTH);
    const result = File.csvToJson(filePath);
    await assert.rejects(result, expected);
  }
  {
    const filePath = "./scenes/valid.csv";
    const expected = [
      {
        id: 1,
        name: "brayan",
        profession: "developer",
        age: 23,
      },
      {
        id: 2,
        name: "brayan",
        profession: "developer",
        age: 23,
      },
      {
        id: 3,
        name: "brayan",
        profession: "developer",
        age: 23,
      },
    ];
    const result = await File.csvToJson(filePath);
    assert.deepEqual(result, expected);
  }
})();
