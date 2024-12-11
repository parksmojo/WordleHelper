import { CharInfo, StateInfo } from "./Info";

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
      `Filtering ${this.wordList.length} words from ${this.wordList[0]} to ${this.wordList[this.wordList.length - 1]}`
    );
    console.log("---------");

    for (let state in StateInfo) {
      const chars = params.filter((val) => val.state === state);
      if (chars.length !== 0) {
        this.applyFilter(state, chars, StateInfo.getFunc(state));
      }
    }

    console.log("---------");
    console.log(
      `Found ${this.wordList.length} words from ${this.wordList[0]} to ${this.wordList[this.wordList.length - 1]}`
    );
  }

  private applyFilter(
    state: string,
    chars: CharInfo[],
    filterFunc: (word: string, char: string, pos: number) => boolean
  ) {
    console.log(
      `Filtering ${state} letters:`,
      chars.map((val) => val.character)
    );

    this.wordList = this.wordList.filter((word) => {
      for (let val of chars) {
        if (!filterFunc(word, val.character, val.position)) {
          return false;
        }
      }
      return true;
    });

    console.log(
      `Filtered to ${this.wordList.length} words from ${this.wordList[0]} to ${this.wordList[this.wordList.length - 1]}`
    );
  }
}
