import { readFileSync, writeFileSync } from "fs";

function convertFile() {
  const inFile = "./word-lists/combined_wordlist.txt";
  const outFile = "./word-lists/all_words.txt";

  const data = readFileSync(inFile, { encoding: "utf-8" });
  const list = data.split("\n").sort();
  const str = JSON.stringify(list);
  writeFileSync(outFile, str);
}
convertFile();
