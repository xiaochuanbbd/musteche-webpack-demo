import Scanner from './Scanner.js'
import nextTokens from "./nextTokens"
export default function parseTemplateToTokens(templateStr){
var tokens = []
// 新生成一个指针记录器
 var scanner = new Scanner(templateStr)

 var word
//  当前指针位置没有在最后一位
 while(!scanner.eos()){
  //  根据{{进行切割字符串，这里是单纯的字符串，并不包括data数据。
    word = scanner.scanUtil('{{')
    if(word){
      // 塞进tokens数组中
      tokens.push(['text',word])
      // nextTokens(word)

    }
    scanner.scan("{{")
    word = scanner.scanUtil('}}')
    if(word){
      if(word[0]=='#'){
        //如果遇见了切割的第一个字符是#，那么将#school这样的格式
        // 切割成['#','school',[tokens]]这样的样子
        tokens.push(['#',word.substring(1)])

      }else if (word[0]=='/'){
         //如果遇见了切割的第一个字符是/，那么将#school这样的格式
        // 切割成['/','school',[tokens]]这样的样子
        tokens.push(['/',word.substring(1)])

      }else{
 //以上都不是，那么就是单纯的data数据，keyname：'name',value:'xxx'
//  ['name',''value]
        tokens.push(['name',word])

      }

    }
    scanner.scan('}}')
 }
  //折叠tokens，组成嵌套数组
return nextTokens(tokens)
}