import { CharInfo, StateInfo, WordInfo } from "./Info";

export class WordleFilter {
  private wordList: string[];
  private currParams: CharInfo[];

  constructor(list: string[]) {
    this.wordList = list;
    this.currParams = [];
  }

  public getList(): string[] {
    return this.wordList;
  }

  public getPossibleWords(params: CharInfo[], words?: string[]): string[] {
    words ??= this.wordList;
    const chars = params.filter((char) => char.state === StateInfo.orange);
    if (chars.length !== 0) {
      words = this.applyFilter(words, StateInfo.orange, chars, StateInfo.getFunc(StateInfo.orange));
    }
    return words;
  }

  public getHelpfulWords(minimumWords: number) {
    const letters = this.getHelpfulLetters(5);
    const params: CharInfo[] = letters.map((letter) => {
      return { character: letter, state: StateInfo.orange, position: 0 };
    });

    let words = this.getPossibleWords(params);
    while (words.length < minimumWords) {
      params.pop();
      words = this.getPossibleWords(params);
    }

    return words.slice(0, minimumWords);
  }

  public getHelpfulLetters(numLetters?: number): string[] {
    const checkedLetters = new Set(this.currParams.map((param) => param.character));
    const letterCounts = new Map();
    for (let word of this.wordList) {
      const letterArray = word.split("");
      const filteredArray = letterArray.filter((letter) => !checkedLetters.has(letter));
      const letters = new Set(filteredArray);
      for (let letter of letters) {
        letterCounts.set(letter, letterCounts.get(letter) ? letterCounts.get(letter) + 1 : 1);
      }
    }
    const sortedArray = Array.from(letterCounts.entries()).sort(([, countA], [, countB]) => countB - countA);
    return sortedArray.slice(0, numLetters ?? 5).map(([letter, count]) => letter);
  }

  public run(params: CharInfo[]): string[] {
    this.addParams(params);
    this.update();
    return this.wordList;
  }

  public addParams(params: CharInfo[]): void {
    for (let param of params) {
      const existingIndex = this.currParams.findIndex((char) => char.character === param.character);
      if (existingIndex >= 0) {
        if (this.currParams[existingIndex].state == StateInfo.green) {
          continue;
        } else if (this.currParams[existingIndex].state == StateInfo.yellow && param.state === StateInfo.green) {
          this.currParams[existingIndex] = param;
        }
      } else {
        this.currParams.push(param);
      }
    }
  }

  public update(): void {
    console.log(
      `Filtering ${this.wordList.length} words from ${this.wordList[0]} to ${this.wordList[this.wordList.length - 1]}`
    );
    console.log("---------");

    for (let state in StateInfo) {
      const chars = this.currParams.filter((val) => val.state === state);
      if (chars.length !== 0) {
        this.wordList = this.applyFilter(this.wordList, state, chars, StateInfo.getFunc(state));
      }
    }

    console.log("---------");
    console.log(
      `Found ${this.wordList.length} words from ${this.wordList[0]} to ${this.wordList[this.wordList.length - 1]}`
    );
  }

  private applyFilter(
    words: string[],
    state: string,
    chars: CharInfo[],
    filterFunc: (word: string, char: string, pos: number) => boolean
  ) {
    console.log(
      `Filtering ${state} letters:`,
      chars.map((char) => char.character)
    );

    const filteredList = words.filter((word) => {
      for (let char of chars) {
        if (!filterFunc(word, char.character, char.position)) {
          return false;
        }
      }
      return true;
    });

    console.log(
      `Filtered to ${filteredList.length} words from ${filteredList[0]} to ${filteredList[filteredList.length - 1]}`
    );

    return filteredList;
  }
}
