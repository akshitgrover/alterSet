"use strict";

/**
 * Add values of properties which are common between all objects, others remain as it is.
 * Return: A new object
 * @param {AlterSet[]} arr 
 */
let addProps = function(...arr){

    let f = new this.constructor(this);
    return arr.reduce((flag, inst)=>{
        if(inst instanceof Object){
            Object.keys(inst).forEach((key)=>{
                let unit = (typeof inst[key] === "number") ? 0 : "";
                flag[key] = (flag[key] || unit) + inst[key];  
            });
            return flag;
        } else{
            return flag;
        }
    }, f);

};

/**
 * Subtract values of properties which are common between all objects, others remain as it is.
 * Return: A new object
 * @param {AlterSet[]} arr 
 */
let subProps = function(...arr){

    let f = new this.constructor(this);
    return arr.reduce((flag, inst)=>{
        if(inst instanceof Object){
            Object.keys(inst).forEach((key)=>{
                flag[key] = (flag[key] || 0) - inst[key];  
            });
            return flag;
        } else{
            return flag;
        }
    }, f);

};

//Export functions
module.exports = {

    addProps,
    subProps
    
};
