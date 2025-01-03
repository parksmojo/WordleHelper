export class StateInfo {
  public static readonly green: string = "green";
  public static readonly yellow: string = "yellow";
  public static readonly black: string = "black";
  public static readonly orange: string = "orange";
  public static readonly unknown: string = "none";

  public static getFunc(state: string): (word: string, char: string, pos: number) => boolean {
    switch (state) {
      case this.black:
        return (word: string, char: string, pos: number) => !word.includes(char);
      case this.orange:
        return (word: string, char: string, pos: number) => word.includes(char);
      case this.yellow:
        return (word: string, char: string, pos: number) => word.includes(char) && word[pos] !== char;
      case this.green:
        return (word: string, char: string, pos: number) => word[pos] === char;
      default:
        return (word: string, char: string, pos: number) => true;
    }
  }
}

export interface CharInfo {
  character: string;
  state: string;
  position: number;
}

export interface WordInfoDto {
  guess: string;
  colors: string;
}

export class WordInfo {
  private guess: string;
  private colors: string;

  constructor(entry: string, result: string) {
    this.guess = entry;
    this.colors = result;
  }

  public getCharInfo(): CharInfo[] {
    const chars: CharInfo[] = [];
    for (let i = 0; i < 5; i++) {
      if (this.colors[i] === "g") {
        chars.push({ character: this.guess[i], state: StateInfo.green, position: i });
      } else if (this.colors[i] === "y") {
        chars.push({ character: this.guess[i], state: StateInfo.yellow, position: i });
      } else if (this.colors[i] === "b") {
        chars.push({ character: this.guess[i], state: StateInfo.black, position: i });
      } else if (this.colors[i] === "o") {
        chars.push({ character: this.guess[i], state: StateInfo.orange, position: i });
      } else {
        throw new Error("Color not found");
      }
    }
    return chars;
  }

  public get dto(): WordInfoDto {
    return { guess: this.guess, colors: this.colors };
  }

  public static fromDto(obj: WordInfoDto): WordInfo {
    return new WordInfo(obj.guess, obj.colors);
  }

  public static fromTuple(tuple: [string, string]): WordInfo {
    return new WordInfo(tuple[0], tuple[1]);
  }
}
