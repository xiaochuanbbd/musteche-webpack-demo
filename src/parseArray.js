import lookUp from './LookUp'
import renderTemplate from './renderTemplate'

//处理数组函数， params：token： 单个的数组['#','xxx',[]]
export default function parseArray(token,data){
  //v为对应data中的key，lookUp解析xxx.xxx
var v  = lookUp(data,token[1])
//初始化一个空串
var resultStr = ''
/*例如：
data= {
  school:[
    {name:'田径大学'},
    {name:'北京大学'}
  ]
}
token：['#','school',['text','xxx']]
*/
//这里将school数组进行循环。对school数组的数据进行读取，并且和初始化字符串拼接
for (let i = 0; i < v.length; i++) {
  resultStr+=renderTemplate(token[2],{//token[2]为#数组那一项里的的数组
    ...v[i],//将school[0]的数据展开 变为 {name:'xxx'}
    ".":v[i],//遇见.直接放数组的每一项
    
  })
  
}
//返回拼接后的字符串
 return resultStr
}