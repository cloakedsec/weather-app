import {
  require_react_dom
} from "./chunk-BMPAPRKI.js";
import "./chunk-VQZU4KMO.js";
import {
  __commonJS
} from "./chunk-5WWUZCGV.js";

// ../.yarn/__virtual__/react-dom-virtual-22fafa95af/5/AppData/Local/Yarn/Berry/cache/react-dom-npm-18.2.0-dd675bca1c-10.zip/node_modules/react-dom/client.js
var require_client = __commonJS({
  "../.yarn/__virtual__/react-dom-virtual-22fafa95af/5/AppData/Local/Yarn/Berry/cache/react-dom-npm-18.2.0-dd675bca1c-10.zip/node_modules/react-dom/client.js"(exports) {
    var m = require_react_dom();
    if (false) {
      exports.createRoot = m.createRoot;
      exports.hydrateRoot = m.hydrateRoot;
    } else {
      i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      exports.createRoot = function(c, o) {
        i.usingClientEntryPoint = true;
        try {
          return m.createRoot(c, o);
        } finally {
          i.usingClientEntryPoint = false;
        }
      };
      exports.hydrateRoot = function(c, h, o) {
        i.usingClientEntryPoint = true;
        try {
          return m.hydrateRoot(c, h, o);
        } finally {
          i.usingClientEntryPoint = false;
        }
      };
    }
    var i;
  }
});
export default require_client();
//# sourceMappingURL=react-dom_client.js.map
