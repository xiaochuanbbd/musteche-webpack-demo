import parseTemplateToTokens from './parseTemplateToTokens'
import renderTemplate from "./renderTemplate"
window.templateEnging = {
  render(templateStr, data) {
    var tokens = parseTemplateToTokens(templateStr)
     var domStr = renderTemplate(tokens,data)
    return domStr
  }
}
//mustache原理
/*
1. 使用了将字符串专为tokens数组的方式，其中主要用到数据结构的栈结构特点：先进后出，后进先出，
  递归对数据进行收集和转换为每一项token，其中token中会嵌套token
2. lookup(寻找连续点符号) ，
   步骤：
   1.先判断他是否有点的存在
   2.对keynama使用split进行字符串拆分成数组
   3.对拆分的数组循环进行读取。 从而可以拿到每一点的数据


*/