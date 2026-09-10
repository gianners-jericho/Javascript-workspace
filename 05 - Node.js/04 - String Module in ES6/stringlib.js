class StringLib {
    concat(word1, word2) {
        let result = '';

        for(let i = 0; i < word1.length; i++) {
            result += word1[i];
        }

        for(let i = 0; i < word2.length; i++) {
            result += word2[i];
        }

        return result;
    }

    repeat(word, times) {
         
        let result = '';

        for(let i = 0; i < times; i++) {
            for(let j = 0; j < word.length; j++) {
                result += word[j]
            }
        }

        return result;

    }

    toString(input) {
         


    }

    charAt(word, index) {
        
        let result = '';

        for (let i = 0; i < word.length; i++) {
            if (i+1 === index) {
                result = word[i];
            }
        }

        return result;
    }

}

module.exports = StringLib;