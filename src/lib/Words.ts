import Words from "@@/public/words2.md"; //test faster
// import Words from "@@/public/words.md"//original slower
import { getWords } from "@/lib/WordsService";

let sanitizedWordsArr: Array<string> = [];
export const makeWordsArray = async () => {
  const words: string = await Words; //test
  // const words2:any = await getWords();
  // console.log(words2);

  let wordsArr = words.split("\n");
  const regexSanitizeStr = /(\r\n|\n|\r)/gm;
  //keep only 5 letter words
  wordsArr = wordsArr.filter(
    (element: any) => element.replace(regexSanitizeStr, "").length == 5
  );
  wordsArr.map((element: any) =>
    sanitizedWordsArr.push(element.replace(regexSanitizeStr, ""))
  );
  return sanitizedWordsArr;
};
