//韩束概念：折叠tokens，组成嵌套数组。
export default function nextTokens(tokens) {
  var nextedTokens = []
  //栈结构
  var sections = []
  //收集器 天生指向nextedtoken
  var collector = nextedTokens

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i]
    switch (token[0]) {
      case "#":
        collector.push(token)
        sections.push(token)
        collector = token[2] = []
        break;
      case '/':
        let section_pop = sections.pop()
        //目前站内是否有数组，有的化等于栈内存的顶部的第二项，没有，直接等于nextedTokens结果数组数组
        collector = sections.length > 0 ? sections[sections.length - 1][2] : nextedTokens
        break;

      default:
        collector.push(token)
    }
  }

  return nextedTokens
}