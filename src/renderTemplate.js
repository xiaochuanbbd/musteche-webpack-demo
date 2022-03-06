
// 递归思路
import lookUp from './LookUp'
import parseArray from './parseArray'
export default function renderTemplate(tokens,data ) {
  let resultStr = ''
  for (let i = 0; i < tokens.length; i++) {
    var token = tokens[i]
    if (token[0] == 'text') {
    // 直接拼接字符串
      resultStr += token[1]
    } else if (token[0] == 'name') {
      // lookUp对a.b.c解构出来
      resultStr+=lookUp(data,token[1])

    }else if(token[0]=='#'){
         //递归字符串
    resultStr+=parseArray(token,data)
    }
 

  }
 
  return resultStr
}