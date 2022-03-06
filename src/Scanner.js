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
     return this.pos >=this.templateStr.length
   }
 }