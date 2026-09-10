export default class stringLib {
    //methods
    concat(word1, word2) { 
        return word1 + word2;
    }

    repeat(word, times) {
        let result = '';
        //use a simple for loop and reuse our concat function to do the repeat
        for (var i = 0; i < times; i++){
            result = this.concat(result, word)
        }
        return result;
    }

    toString(input) {
        // Concatenating any data type with an empty string implicitly casts it to a string
        return '' + input;
    }

    charAt(word, index) {
        //if its a valid index, return the character in that word
        if (index >= 0 && index < word.length){
            return word[index];
        }
        return '';
    }
}