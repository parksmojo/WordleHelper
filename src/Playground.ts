import fs from "fs";

enum CharState {
  unknown,
  black,
  yellow,
  green,
}

interface CharInfo {
  character: string;
  state: CharState;
  position: number;
}

interface WordInfo {
  word: string;
  colors: string;
}

function filter(list: string[], chars: CharInfo[], filterFunc: (word: string, char: string, pos: number) => boolean) {
  return list.filter((word) => {
    for (let val of chars) {
      if (!filterFunc(word, val.character, val.position)) {
        return false;
      }
    }
    return true;
  });
}

function wordleFilter(wordList: string[], params: CharInfo[]): string[] {
  console.log(`Filtering ${wordList.length} words from ${wordList[0]} to ${wordList[wordList.length - 1]}\n---------`);
  let result: string[] = wordList.slice();

  const removed = params.filter((val) => val.state === CharState.black);
  if (removed.length !== 0) {
    console.log(
      "  Filtering black letters:",
      removed.map((val) => val.character)
    );
    result = filter(result, removed, (word: string, char: string, pos: number) => !word.includes(char));
    console.log(`  Filtered to ${result.length} words from ${result[0]} to ${result[result.length - 1]}`);
  }

  const exists = params.filter((val) => val.state === CharState.yellow);
  if (exists.length !== 0) {
    console.log(
      "  Filtering yellow letters:",
      exists.map((val) => val.character)
    );
    result = filter(
      result,
      exists,
      (word: string, char: string, pos: number) => word.includes(char) && word[pos] !== char
    );
    console.log(`  Filtered to ${result.length} words from ${result[0]} to ${result[result.length - 1]}`);
  }

  const found = params.filter((val) => val.state === CharState.green);
  if (found.length !== 0) {
    console.log(
      "  Filtering green letters:",
      found.map((val) => val.character)
    );
    result = filter(result, found, (word: string, char: string, pos: number) => word[pos] === char);
    console.log(`  Filtered to ${result.length} words from ${result[0]} to ${result[result.length - 1]}`);
  }

  console.log(`---------\nFinished with ${result.length} words from ${result[0]} to ${result[result.length - 1]}`);
  return result;
}

function importWords(includeAll: boolean): string[] {
  const data = fs.readFileSync(`./word-lists/${includeAll ? "PossibleGuesses" : "RealAnswers"}.txt`, {
    encoding: "utf8",
    flag: "r",
  });
  return JSON.parse(data);
}

function wordToChars(word: WordInfo): CharInfo[] {
  const chars: CharInfo[] = [];
  for (let i = 0; i < 5; i++) {
    if (word.colors[i] === "g") {
      chars.push({ character: word.word[i], state: CharState.green, position: i });
    } else if (word.colors[i] === "y") {
      chars.push({ character: word.word[i], state: CharState.yellow, position: i });
    } else if (word.colors[i] === "b") {
      chars.push({ character: word.word[i], state: CharState.black, position: i });
    } else {
      throw new Error("Color not found");
    }
  }
  return chars;
}

function main() {
  const words = importWords(true);
  let i = 0;
  const triedWords: WordInfo[] = [
    { word: "alive", colors: "bgbbb" },
    { word: "young", colors: "bbgbb" },
    { word: "pucks", colors: "gybbb" },
  ];
  const params: CharInfo[] = [];
  triedWords.forEach((val) => params.push(...wordToChars(val)));
  const result = wordleFilter(words, params);
  const printAll = true;
  if (printAll) {
    console.log(result);
  } else {
    console.log(result.slice(0, 5));
    if (result.length > 10) {
      console.log(result.slice(-5));
    }
  }
}

main();
