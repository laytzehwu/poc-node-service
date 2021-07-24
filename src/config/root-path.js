/**
 * Calculate root path and export it
*/

const path = require('path');

module.exports = ((oriPath) => {
    let refPath = oriPath;
    let pathObj;
    while(pathObj = path.parse(refPath)) {
        switch(pathObj.name) {
            case 'config':
            case 'services':
            case 'src':
                refPath = pathObj.dir;
                continue;
        }
        return refPath;
    }
})(__dirname);
// Note: variable __filename and __dirname are parameters module function wrapper as 
// (function (exports, require, module, __filename, __dirname){})
