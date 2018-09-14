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

/**
 * Sort a given array (passed as argument)
 * @param {Array} arr - Array to be sorted
 * @param {String} [order=ASC] - Ascending `ASC` | Descending `DESC` 
 * @memberof func
 * @returns {Array} - Sorted Array 
 */
let sort = (arr, order = "ASC")=>{
    
    if(typeof order !== "string"){
        let e = new Error(`order should be 'string' got ${typeof order}`);
        e.code = "ERR_INVALID_ARG_TYPE";
        throw e;
    }
    if(order !== "ASC" && order !== "DESC"){
        let e = new Error(`value of order should be 'ASC' or 'DESC' got ${order}`);
        e.code = "ERR_INVALID_ARG_VALUE";
        throw e;
    }

    let sortedArr = [];
    switch(order){

        case "ASC":
            sortedArr = arr.sort((p, n)=>{
                return p - n;
            });
            break;
        
        case "DESC":
            sortedArr = arr.sort((p, n)=>{
                return n - p;
            });
            break;

    }
    return sortedArr;

};

//Export functions
module.exports = (AlterSet)=>{
    
    return {
        addGlobal: addGlobal.bind(addGlobal, AlterSet),
        fromJson,
        sort
    };
    
};
