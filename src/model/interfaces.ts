enum CharState {
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

export interface WordInfo {
  word: string;
  colors: string;
}
