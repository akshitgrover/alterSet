"use strict";

const functions = require("./functions"); //Import standalone functions
const prototypes = require("./prototypes"); //Import functions to be added in prototype chain

/**
 * Initialize AlterSet (Constructor Function)
 * @param {Object} [obj] - Object whose properties you want to have with alterset
 */
function AlterSet(obj){

    if(!new.target){
        return new AlterSet(obj);
    }
    if(typeof obj !== "undefined"){
        this.prototype = Object.assign({}, obj, this.prototype);
    }

}

//Add functions in the prototype chain
Object.assign(AlterSet.prototype, prototypes);

//Export: alterSet constructor
module.exports = AlterSet;

//Export: Standalone Object utility functions
module.exports.func = functions(AlterSet);
