import { Importer } from "./files/Importer";
import { CharInfo, StateInfo, WordInfo } from "./model/Info";
import { WordleFilter } from "./model/WordleFilter";

function main(input: [string, string][]) {
  const words = Importer.importWords(true);
  const filter = new WordleFilter(words);

  const params: CharInfo[] = [];
  input.forEach((word) => params.push(...WordInfo.fromTuple(word).getCharInfo()));
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

  const testParams: CharInfo[] = [
    { character: "p", state: StateInfo.orange, position: 0 },
    { character: "c", state: StateInfo.orange, position: 0 },
    // { character: "s", state: StateInfo.orange, position: 0 },
  ];

  const possible = filter.getPossibleWords(testParams);
  console.log(possible);
}

const triedWords: [string, string][] = [
  ["alive", "bgbbb"],
  ["young", "bbgbb"],
];

main(triedWords);
