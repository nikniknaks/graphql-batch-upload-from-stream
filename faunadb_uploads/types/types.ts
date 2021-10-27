interface Letter {
  letter: String;
  occurence: Number;
}

interface WordDocument {
  word: String;
  letters: Array<Letter>;
  length: Number ;
}