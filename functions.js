"use strict";

/**
 * Add properties to all the objects, `Existing` as well as `To be created`.
 * Avoid using this utility in bigger projects
 * @param {Object} obj
 */
let addGlobal = (AlterSet, obj)=>{
    let x = AlterSet.prototype.__proto__;
    Object.assign(x, obj, x);
    x = null;
    return;
}

module.exports = (AlterSet)=>{
    return {
        addGlobal: addGlobal.bind(addGlobal, AlterSet)
    }
}
