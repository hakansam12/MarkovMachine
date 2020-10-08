/** Textual markov chain generator */


class MarkovMachine {



  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }


  makeChains() {
    let chains = new Map();

    for (let i = 0; i < this.words.length; i += 1) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (chains.has(word)) {
        chains.get(word).push(nextWord);
      }
      else {
        chains.set(word, [nextWord]);
      }
    }

    this.chains = chains;
  }



  static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];
  }



  makeText(numWords = 100) {
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.choice(keys);
    let out = [];

    while (out.length < numWords && key !== null) {
      out.push(key);
      key = MarkovMachine.choice(this.chains.get(key));
    }

    return out.join(" ");
  }
}


module.exports = {
  MarkovMachine,
};


