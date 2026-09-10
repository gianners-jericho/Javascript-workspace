class StringMethods{
    concat(word1, word2){
        return word1 + " " +  word2;
    }

    repeat(word, repeat){
        let words = "";
        for (let i = 0; i < repeat; i++){
            words += word + " " // Just string concatenation
        }

        return words;
    }

    toString(word){
        let stringify = word + "" // To force the word to become a string
        return stringify;
    }

    charAt(word, index){
        return word[index]
    }
}

export default StringMethods;