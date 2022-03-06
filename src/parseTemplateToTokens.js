import Scanner from './Scanner.js'
import nextTokens from "./nextTokens"
export default function parseTemplateToTokens(templateStr){
var tokens = []
 var scanner = new Scanner(templateStr)
 var word
 while(!scanner.eos()){
    word = scanner.scanUtil('{{')
    if(word){
      tokens.push(['text',word])
      // nextTokens(word)

    }
    scanner.scan("{{")
    word = scanner.scanUtil('}}')
    if(word){
      if(word[0]=='#'){
        tokens.push(['#',word.substring(1)])

      }else if (word[0]=='/'){
        tokens.push(['/',word.substring(1)])

      }else{
        tokens.push(['name',word])

      }

    }
    scanner.scan('}}')
 }
return nextTokens(tokens)
}