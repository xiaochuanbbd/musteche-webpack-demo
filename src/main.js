import parseTemplateToTokens from './parseTemplateToTokens'
import renderTemplate from "./renderTemplate"
window.templateEnging = {
  render(templateStr, data) {
    var tokens = parseTemplateToTokens(templateStr)
     var domStr = renderTemplate(tokens,data)
    return domStr
  }
}