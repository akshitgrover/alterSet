"use strict";

const functions = require("./functions");

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

//Export: alterSet constructor
module.exports = AlterSet;

//Export: Standalone Object utility functions
module.exports.func = functions(AlterSet);
