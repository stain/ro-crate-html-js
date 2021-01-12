const pairtree = require("pairtree");
const path = require("path");

class StaticUtils {
    hasOwnPage(item, config) {
        // Check if something 
        if (!Array.isArray(item["@type"])) {
            item["@type"] = [ item["@type"]];
        }
        if (!config.types) {
            config.types = {};
        }
        const typeOverlap = Object.keys(config.types).filter(value => item["@type"].includes(value));
        return typeOverlap.length > 0
    }

   getLink(baseID, toID){
        const from = this.segmentPath(baseID);
        const to = this.segmentPath(toID);
        const rel = path.relative(`${from}`, `${to}`);
        return path.join(rel, "ro-crate-preview.html");
   }

   getImagePath(baseID, toID){
    const from = this.segmentPath(baseID);
    const to = toID;
    const rel = path.relative(`${from}`, `${to}`);
    return path.join(rel);
}

   getHomeLink(baseID) {
        return path.join(path.relative(`/${this.segmentPath(baseID)}`, "/"), "ro-crate-preview.html");
   }


   getRelDataPath() {
        return path.join(path.relative("/" + this.rootDisplayableItem.graph._relPath, "/" + this.itemID));
    }

   segmentPath(p) {
        if (p === "./") {
                return "/";
        }    
        return `/ro-crate-preview_files${pairtree.path(p.replace(/^#/, ""))}`;
    }
}

module.exports = StaticUtils;