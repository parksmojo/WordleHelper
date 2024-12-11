import { CharInfo, CharState } from "./Info";

export class WordleFilter {
  private wordList: string[];

  constructor(list: string[]) {
    this.wordList = list;
  }

  public getList(): string[] {
    return this.wordList;
  }

  public getRandomWord(): string {
    const i = Math.floor(Math.random() * this.wordList.length);
    return this.wordList[i];
  }

  public addParams(params: CharInfo[]): void {
    console.log(
      `Filtering ${this.wordList.length} words from ${this.wordList[0]} to ${
        this.wordList[this.wordList.length - 1]
      }\n---------`
    );

    const removed = params.filter((val) => val.state === CharState.black);
    if (removed.length !== 0) {
      console.log(
        "  Filtering black letters:",
        removed.map((val) => val.character)
      );
      this.applyFilter(removed, (word: string, char: string, pos: number) => !word.includes(char));
      console.log(
        `  Filtered to ${this.wordList.length} words from ${this.wordList[0]} to ${
          this.wordList[this.wordList.length - 1]
        }`
      );
    }

    const exists = params.filter((val) => val.state === CharState.yellow);
    if (exists.length !== 0) {
      console.log(
        "  Filtering yellow letters:",
        exists.map((val) => val.character)
      );
      this.applyFilter(exists, (word: string, char: string, pos: number) => word.includes(char) && word[pos] !== char);
      console.log(
        `  Filtered to ${this.wordList.length} words from ${this.wordList[0]} to ${
          this.wordList[this.wordList.length - 1]
        }`
      );
    }

    const found = params.filter((val) => val.state === CharState.green);
    if (found.length !== 0) {
      console.log(
        "  Filtering green letters:",
        found.map((val) => val.character)
      );
      this.applyFilter(found, (word: string, char: string, pos: number) => word[pos] === char);
      console.log(
        `  Filtered to ${this.wordList.length} words from ${this.wordList[0]} to ${
          this.wordList[this.wordList.length - 1]
        }`
      );
    }

    console.log(
      `---------\nFinished with ${this.wordList.length} words from ${this.wordList[0]} to ${
        this.wordList[this.wordList.length - 1]
      }`
    );
  }

  private applyFilter(chars: CharInfo[], filterFunc: (word: string, char: string, pos: number) => boolean) {
    this.wordList = this.wordList.filter((word) => {
      for (let val of chars) {
        if (!filterFunc(word, val.character, val.position)) {
          return false;
        }
      }
      return true;
    });
  }
}
