module.exports = function (){
    return {
        concat: function(word1, word2){
            return `${word1}${word2}`;
        },
        repeat: function(word, count){
            let output = "";
            for(let i = 0; i<count; i++){
                output += word;
            }
            return output;
        },
        toString: function(input){
            return input + ""
        },
        charAt: function(word, index){
            return word[index];
        },
    }
}