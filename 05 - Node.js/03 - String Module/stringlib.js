module.exports = function (){
    return {
        concat: function(word1, word2) {
            return word1 + " " +  word2;
        },

        repeat: function(word, repeat){
            let words = "";
            for (let i = 0; i < repeat; i++){
                words += word + " " // Just string concatenation
            }
            return words;
        },

        toString: function(word){
            let stringify = word + "" // To force the word to become a string
            return stringify;
        },

        charAt: function(word, index){
            return word[index];
        }
    }
}