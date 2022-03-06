//函数概念：折叠tokens，组成嵌套数组。
export default function nextTokens(tokens) {
  var nextedTokens = []
  //栈结构
  var sections = []
  //收集器 天生指向nextedtoken，这里数组的引用的是同一个内存地址。 
  // 收集器就是nextTokens
  var collector = nextedTokens

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i]
    switch (token[0]) {
      case "#":
        // 如果遇见了#，收集器收集，
        collector.push(token)
        //  将该token压栈
        sections.push(token)
        // 释放收集器
        collector = token[2] = []
        break;
      case '/':
        // 遇见'/',结束出栈，移出栈顶的那个（后进先出）
        // 代表嵌套最里面的数组已经生成token完毕，可以出栈。
        let section_pop = sections.pop()
        //目前站内是否有数组，有的话等于栈内存的顶部的第二项，没有，
        // 直接等于nextedTokens结果数组数组
        collector = sections.length > 0 ? sections[sections.length - 1][2] : nextedTokens
        break;

      default:
        //不是循环的情况（‘#’，‘/'，没有的情况），直接push
        collector.push(token)
    }
  }
  // 这里数组的引用的是同一个内存地址。 
  //collector 收集器就是nextTokens
  return nextedTokens
}