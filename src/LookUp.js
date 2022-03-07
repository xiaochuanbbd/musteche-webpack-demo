//功能： 寻找连续点符号的内容 比如a.b.c
// {
// a: {
//   b:{
//     c:100
//   }
// }
// }
/*params
data: {a:b:{c:100}}
keyname: "a.b.c"
*/
export default function lookUp(dataObj, keyname) {
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
