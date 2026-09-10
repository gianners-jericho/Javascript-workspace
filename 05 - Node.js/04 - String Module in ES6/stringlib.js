class Stringlib {
     concat(word1, word2){ 
          return `${word1}${word2}`;
     }

     repeat(word, times) {
          let result = ""
          for(let i = 0; i < times; i++){
               result += word
          }
          return result;
     }

     toString(input) {
          return String(input)
     }

     charAt(word, index) {
          return word[index]
     }
};

module.exports = new Stringlib();