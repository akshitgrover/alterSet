"use strict";

/**
 * Add properties to all the objects, `Existing` as well as `To be created`.
 * Avoid using this utility in bigger projects
 * @memberof func
 * @param {Object} obj - Object to properties
 * @returns {Object} - Null Object
 */
let addGlobal = (AlterSet, obj)=>{

    let x = AlterSet.prototype.__proto__;
    Object.assign(x, obj, x);
    x = null;
    return null;

};

/**
 * Convert JSON to Object
 * @memberof func
 * @param {String} json - JSON representation of the object to retrieve
 * @return {Object} - JSON to Object
 */
let fromJson = (json)=>{

    return JSON.parse(json);

};

//Export functions
module.exports = (AlterSet)=>{
    
    return {
        addGlobal: addGlobal.bind(addGlobal, AlterSet),
        fromJson
    };
    
};
