import { WordleFilter } from "./model/WordleFilter";
import { Importer } from "./files/Importer";
import { WordInfo } from "./model/Info";

let inputBuffer = "";
const stdin = process.stdin;
stdin.setEncoding("utf-8");
stdin.resume();

const readInput = (): Promise<string> => {
  return new Promise((resolve) => {
    stdin.once("data", (data) => resolve(data.toString()));
  });
};

const mainLoop = async (allWords: string[]) => {
  let filter = new WordleFilter(allWords);
  while (true) {
    process.stdout.write("> ");
    const input = (await readInput()).trim().toLowerCase();

    if (input === "exit") {
      process.stdout.write("Goodbye!\n");
      process.exit(0);
    } else if (input === "help") {
      printHelp();
    } else if (input === "add") {
      process.stdout.write("Enter the word: ");
      const word = (await readInput()).trim().toLowerCase();
      if (word.length != 5) {
        process.stdout.write("Icorrect word size");
        continue;
      }
      process.stdout.write("Enter the colors: ");
      const states = (await readInput()).trim().toLowerCase();
      if (states.length != 5) {
        process.stdout.write("Icorrect word size");
        continue;
      }
      filter.run(WordInfo.fromTuple([word, states]).getCharInfo());
    } else if (input === "see") {
      console.log(filter.getList());
    } else if (input === "words") {
      process.stdout.write("Enter the number of words you want: ");
      const input = (await readInput()).trim();
      const number = parseInt(input);
      const words = filter.getHelpfulWords(number);
      console.log(words);
    } else if (input === "letters") {
      console.log(filter.getHelpfulLetters());
    } else if (input === "new") {
      filter = new WordleFilter(allWords);
    } else {
      process.stdout.write("Unrecognized command\n");
      printHelp();
    }
  }
};

const printHelp = () => {
  process.stdout.write("  add - Add a word to the filter\n");
  process.stdout.write("  see - See all possible words\n");
  process.stdout.write("  words - See a list of good guesses\n");
  process.stdout.write("  letters - See a list of common letters\n");
  process.stdout.write("  new - Restart the filter\n");
  process.stdout.write("  help - See this menu\n");
  process.stdout.write("  exit - close this program\n");
};

async function main() {
  process.stdout.write("Welcome to the TypeScript REPL!\n");

  let words: string[];
  while (true) {
    process.stdout.write("Please enter 'easy' or 'hard': ");
    const mode = (await readInput()).trim().toLowerCase();
    if (mode === "easy") {
      words = Importer.importWords(false);
      break;
    } else if (mode === "hard") {
      words = Importer.importWords(true);
      break;
    } else {
      process.stdout.write("Unrecognized response. Please try again\n");
    }
  }
  printHelp();
  mainLoop(words);
}

main();
