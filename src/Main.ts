import { Importer } from "./files/Importer";
import { CharInfo, WordInfo } from "./model/Info";
import { WordleFilter } from "./model/WordleFilter";

function main() {
  const words = Importer.importWords(true);
  const filter = new WordleFilter(words);
  const triedWords: WordInfo[] = [
    new WordInfo("alive", "bgbbb"),
    new WordInfo("young", "bbgbb"),
    new WordInfo("pucks", "gybbb"),
  ];
  const params: CharInfo[] = [];
  triedWords.forEach((word) => params.push(...word.getCharInfo()));
  filter.addParams(params);
  const result = filter.getList();

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
