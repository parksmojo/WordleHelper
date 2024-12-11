import fs from "fs";

export class Importer {
  public static importWords(includeAll: boolean): string[] {
    const data = fs.readFileSync(`./word-lists/${includeAll ? "PossibleGuesses" : "RealAnswers"}.txt`, {
      encoding: "utf8",
      flag: "r",
    });
    return JSON.parse(data);
  }
}
