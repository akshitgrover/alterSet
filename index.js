"use strict";

/** 
 * Initialize AlterSet (Constructor Function)
 * @param {Object} obj - Object whose properties you want to have with alterset
*/
function AlterSet(obj){

    if(!new.target){
        this = new AlterSet();
    }
    if(typeof obj !== "undefined"){
        this.prototype = Object.assign({}, obj, this.prototype,);
    }

}

module.exports = AlterSet;
