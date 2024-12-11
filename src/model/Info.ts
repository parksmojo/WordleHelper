export enum CharState {
  unknown,
  black,
  yellow,
  green,
}

export interface CharInfo {
  character: string;
  state: CharState;
  position: number;
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
        chars.push({ character: this.guess[i], state: CharState.green, position: i });
      } else if (this.colors[i] === "y") {
        chars.push({ character: this.guess[i], state: CharState.yellow, position: i });
      } else if (this.colors[i] === "b") {
        chars.push({ character: this.guess[i], state: CharState.black, position: i });
      } else {
        throw new Error("Color not found");
      }
    }
    return chars;
  }
}
