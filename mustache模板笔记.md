# mustache模板解析

示例：

```javascript
   var templateStr = `
        <ul>
            {{#students}}
            <li>
            <p>我的 名字是{{name}}</p>
               <ol>
                我的爱好是：
                {{#hibbies}}
                <li>{{.}}</li>
                {{/hibbies}}
                </ol>
            </li>
            {{/students}}
    </ul>
var	data = {
            students: [{
                    name: "王梁",
                    hibbies: ['打游戏', '要亲']
                },
                {
                    name: "廖晓川",
                    hibbies: ['打王梁', '要习']
                }
            ]
        }
```

方法：

## render（templateStr,data）


功能主要将需要解析的字符串，传入data中
步骤：
1.将模版转换为tokens数组
2.将tokens数组转换为对应的html

params: templateStr 解析的字符串，data, 传入的数据

```javascript
window.templateEnging = {
  render(templateStr, data) {
    var tokens = parseTemplateToTokens(templateStr)
     var domStr = renderTemplate(tokens,data)
    return domStr
  }
}
```

## parseTemplateToTokens(templateStr) 

功能：将字符串转为tokens数组，根据text，name，和#xxx循环转换为一维二维tokens

eg:

```javascript
[
	['text','<li>'],
	['name','mood'],
	['#','school',['text','<ol>',['name','thing']]]
]
```

```javascript
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
```



## Scanner()指针记录器

```javascript
export default class Scanner {
   constructor(templateStr) {
     this.templateStr = templateStr
     this.pos = 0
     this.tail = this.templateStr
   }
   //记录走过的内容，没有返回值
   scan(tag) {
     if (this.tail.indexOf(tag) == 0) {
       this.pos += tag.length
     }
   }
   //指针扫描，直到遇见指定内容结束， 并且返回结束之前路过的字符
   scanUtil(stopTag) {
     const pos_backup = this.pos
     while (!this.eos() && this.tail.indexOf(stopTag) != 0) {
       this.pos++
       this.tail = this.templateStr.substr(this.pos)
     }
     return this.templateStr.substring(pos_backup, this.pos)
   }
   eos() {
    //  当前指针位置没有在最后一位
     return this.pos >=this.templateStr.length
   }
 }
```

### scanutil(stopTag) 

功能：指针，主要是扫描templateStr字符串，并且返回结束之前路过的字符。去掉{{}}符号，

params： stopTag 停止字符eg: "{{","}}","#","/"

## nextTokens(tokens)

功能：折叠tokens,组成嵌套数组

eg:

```javascript
[
	['text','<li>'],
	['name','mood'],
	['#','school',['text','<ol>',['name','thing']]]
]
```

技术点，原理： 这里主要采取的是栈结构，栈的先进后出的道理。

sections=[] 栈结构

collector 收集器： 用于收集需要压栈的，一开始等于初始的数组，压在最底下，后面进来的在最上面，后面进来的token，会放到#数组的token[2]项，先等最上面的出去，pop(方法调用)， 

```javascript
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
```

##  renderTemplate(tokens,data )
功能:将tokens数组解析出来成嵌套了数据的字符串  参数：tokens（每一条token），data 数据

```javascript
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
```

##  lookUp(data,token)
功能： 寻找连续点符号的内容，例入：a.b.c
参数：data：{a:{b:{C}}} ,token:"a.b.c"
```javascript
function lookUp(dataObj, keyname) {
	// keyname中包含.符号并且本身不等于.符号,才进入这个判断，
	if (keyname.indexOf('.') != -1 && keyname != '.') {
		// 将a.b.c拆分成一个数组
		var names = keyname.split('.');
		var temp = dataObj;
		for (let i = 0; i < names.length; i++) {
			//第一次data.a 第二次data.a.b 第三次 data.a.b.c
			temp = temp[names[i]];
		}
		return temp;
	}
	//不包含.符号或者本身等于.符号直接返回 data,keynane
	return dataObj[keyname];
}


```

##  parseArray(token,data)

功能： 处理token数组的函数  
参数：data：  ,token： 单个的数组['#','xxx',[]]
```javascript
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
```

### 学到了什么：
1. mustache原理
 使用了将字符串专为tokens数组的方式，其中主要用到数据结构的栈结构特点：先进后出，后进先出，
  递归对数据进行收集和转换为每一项token，其中token中会嵌套token
2. lookup(寻找连续点符号) ，
   步骤：
   1.先判断他是否有点的存在
   2.对keynama使用split进行字符串拆分成数组
   3.对拆分的数组循环进行读取。 从而可以拿到每一点的数据

 
