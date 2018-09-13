"use strict";

const functions = require("./functions"); //Import standalone functions
const prototypes = require("./prototypes"); //Import functions to be added in prototype chain

/**
 * Initialize AlterSet (Constructor Function)
 * @class
 * @param {Object} [obj] - Object whose properties you want to have in alterset
 * @
 */
function AlterSet(obj){

    if(!new.target){
        return new AlterSet(obj);
    }
    if(typeof obj !== "undefined"){
        Object.assign(this, obj);
    }

}

//Add functions in the prototype chain
Object.assign(AlterSet.prototype, prototypes);

//Export: alterSet constructor
module.exports = AlterSet;

//Export: Standalone Object utility functions
/**@namespace */
module.exports.func = functions(AlterSet);
