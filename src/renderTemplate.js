
// 递归思路
import lookUp from './LookUp'
import parseArray from './parseArray'

export default function renderTemplate(tokens,data ) {
  //初始化一条空串
  let resultStr = ''
  //循环tokens 
  for (let i = 0; i < tokens.length; i++) {
    var token = tokens[i]
    if (token[0] == 'text') {
    // 直接拼接字符串
      resultStr += token[1]
    } else if (token[0] == 'name') {
      // lookUp对a.b.c解构出来
      resultStr+=lookUp(data,token[1])

    }else if(token[0]=='#'){
         //表示这是一组需要循环的递归字符串
    resultStr+=parseArray(token,data)
    }
 

  }
 //返回刚刚拼接好的字符串
  return resultStr
}