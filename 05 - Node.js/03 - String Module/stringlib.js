module.exports = function (){
  return {
    concat: function(word1, word2) { 
         
        let result = '';

        for(let i = 0; i < word1.length; i++) {
            result += word1[i];
        }

        for(let i = 0; i < word2.length; i++) {
            result += word2[i];
        }

        return result;
    },
    repeat: function(word, times) {
         
        let result = '';

        for(let i = 0; i < times; i++) {
            for(let j = 0; j < word.length; j++) {
                result += word[j]
            }
        }

        return result;

    },
    toString: function(input) {
         


    },
    charAt: function(word, index) {
        
        let result = '';

        for (let i = 0; i < word.length; i++) {
            if (i+1 === index) {
                result = word[i];
            }
        }

        return result;
    }
  }
};   