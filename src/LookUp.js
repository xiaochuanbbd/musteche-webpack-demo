//功能： 寻找连续点符号的内容 比如a.b.c
// {
// a: {
//   b:{
//     c:100
//   }
// }
// }
export default function lookUp(dataObj, keyname) {
  if (keyname.indexOf('.') != -1 && keyname != '.') {
    var names = keyname.split('.')
    var temp = dataObj
    for (let i = 0; i < names.length; i++) {
      temp = temp[names[i]]
    }
    return temp
  }
  return dataObj[keyname]

}