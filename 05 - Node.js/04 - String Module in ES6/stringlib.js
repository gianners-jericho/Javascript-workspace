export default class StringLib{
    static concat(word1, word2){
        return `${word1}${word2}`;
    }

    static repeat(word, count){
        let output = ""

        for(let i = 0; i < count; i++){
            output += word;
        }

        return output;
    }

    static toString(input){
        return input + "";
    }

    static charAt(word, index){
        return word[index];
    }

}