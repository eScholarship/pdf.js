
window.SystemJS = {
  import: function(path) {
    console.log("SystemJS stub: would process import path:", path)
  }
}

let versionInfo = require('./dist/version.json')

window.PDFJSDev = {
  test: function(str) {
    return str.indexOf( "PRODUCTION") >= 0 || str.indexOf("GENERIC") >= 0
  },
  eval: function(str) {
    if (str == "BUNDLE_VERSION") // MH CDL: Must update these when updating pdf.js worker version
      return versionInfo.version
    else if (str == "BUNDLE_BUILD")
      return versionInfo.build
    else
      return null // not 'undefined'
  },
  json: function(str) {
    // MH CDL: Had to add second clause here to avoid a log msg
    if (str == "$ROOT/web/default_preferences.json" || str == "$ROOT/build/default_preferences.json")
      return {
        "showPreviousViewOnLoad": true,
        "defaultZoomValue": "",
        "sidebarViewOnLoad": 0,
        "enableHandToolOnLoad": false,
        "cursorToolOnLoad": 0,
        "enableWebGL": false,
        "pdfBugEnabled": false,
        "disableRange": false,
        "disableStream": false,
        "disableAutoFetch": false, // to avoid giant PDFs eating all memory
        "disableFontFace": false,
        "disableTextLayer": false,
        "useOnlyCssZoom": false,
        "externalLinkTarget": 0,
        "enhanceTextSelection": false,
        "renderer": "canvas",
        "renderInteractiveForms": false,
        "enablePrintAutoRotate": false,
        "disablePageMode": false,
        "disablePageLabels": false
      }
    else
      console.log("hmm, PDFJSDev.json str=", str)
    return null
  }
}

require("./web/viewer.js");
