import lookUp from './LookUp'
import renderTemplate from './renderTemplate'

//处理数组函数， params：token： 单个的数组['#','xxx',[]]
export default function parseArray(token,data){
var v  = lookUp(data,token[1])
var resultStr = ''
for (let i = 0; i < v.length; i++) {
  resultStr+=renderTemplate(token[2],{
    ...v[i],
    ".":v[i],
    
  })
  
}
 return resultStr
}