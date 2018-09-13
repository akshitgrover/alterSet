"use strict";

/**
 * Add values of properties which are common between all objects, others remain as it is.
 * Return: A new object
 * @param {AlterSet[] | Object[]} arr 
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
 * @param {AlterSet[] | Object[]} arr 
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

/**
 * Create an object with values from existing object and properties specified in array.
 * Return: Object
 * @param {Array} arr - Properties array.
 * @param {Object} [options={unref:true, protoLookup:true}] - Object containing control params
 * @param {bool} [options.unref=true] - `true` to reserve protochain
 * @param {bool} [options.protoLookup=true] - `true` to look in protochain for value
 */
let intersection = function(arr, options = {}){

    if(typeof arr !== "object"){
        let e = new Error(`arr should be 'object' got '${typeof options}'`);
        e.code = "ERR_INVALID_ARG_TYPE";
        throw e;
    }
    if(typeof options !== "object"){
        let e = new Error(`options should be 'object' got '${typeof options}'`);
        e.code = "ERR_INVALID_ARG_TYPE";
        throw e;
    }

    let flag = new Object();
    let flagObj = new (function(){});

    //Specify default values;
    options.unref = (typeof options.unref === "undefined") ? true : options.unref;
    options.protoLookup = (typeof options.protoLookup === "undefined") ? true : options.protoLookup;

    if(options.protoLookup === false){
        flag = Object.assign({}, this);
    } else if(options.protoLookup === true){
        flag = Object.create(this);
    } else{
        let e = new Error(`options.protoLookup should be 'boolean' got '${typeof options.unref}'`);
        e.code = "ERR_INVALID_ARG_TYPE";
        throw e;
    }
    for(let i of arr){
        if(typeof flag[i] !== "undefined"){
            flagObj[i] = flag[i];
        }
    }
    if(options.unref === true){
        return Object.assign({}, flagObj);
    } else if(options.unref === false){
        flagObj.__proto__ = this.__proto__;
        return flagObj;
    } else{
        let e = new Error(`options.unref should be 'boolean' got '${typeof options.unref}'`);
        e.code = "ERR_INVALID_ARG_TYPE";
        throw e;
    }
    
};

/**
 * Create an object with key, value pairs in both objects, overring with the pairs of passed object
 * Return: Object
 * @param {AlterSet | Object} obj - Object to append key value paris of
 * @param {Object} [options={unref:false}] - Object containing control params
 * @param {bool} [options.unref=false] - `true` to create new object else modify `this`
 */
let union = function(obj, options = {unref:false}){

    if(typeof obj !== "object"){
        let e = new Error(`obj should be 'object' got '${typeof options}'`);
        e.code = "ERR_INVALID_ARG_TYPE";
        throw e; 
    }
    if(typeof options !== "object"){
        let e = new Error(`options should be 'object' got '${typeof options}'`);
        e.code = "ERR_INVALID_ARG_TYPE";
        throw e;
    }

    let x;
    if(options.unref === true){
        let flag = Object.create(this);
        x = Object.assign(flag, obj);
    } else if(options.unref === false){
        x = Object.assign(this, obj);
    } else{
        let e = new Error(`options.unref should be 'boolean' got '${typeof options.unref}'`);
        e.code = "ERR_INVALID_ARG_TYPE";
        throw e;
    }
    return x;

};

/**
 * Return default value if property not found
 * @param {string} key - Property to search for
 * @param {*} [d] - Value to return in case of miss
 */
let get = function(key, d = null){

    if(typeof key !== "string"){
        let e = new Error(`key should be 'string' got '${typeof options.unref}'`);
        e.code = "ERR_INVALID_ARG_TYPE";
        throw e;
    }
    let flag = (this.hasOwnProperty(key)) ? this[key] : d;
    return flag;

};

/**
 * Get JSON representation of the object
 */
let json = function(){
    return JSON.stringify(this);
};

/**
 * Intuitive way of checking key existence
 * @param {string} key - Key to check existence of
 */
let hasKey = function(key){
    
    if(typeof key !== "string"){
        let e = new Error(`key should be 'string' got ${typeof key}`);
        e.code = "ERR_INVALID_ARG_TYPE";
        throw e;
    }
    return this.hasOwnProperty(key);

};

/**
 * Find keys having a certain value
 * @param {string | number} value - Value to search the keys for
 * @param {Object} options - Object with control params
 * @param {boolean} options.strict - Flag to switch between strict/unstrict value matching
 */
let withValue = function(value, options = {strict: false}){

    if(typeof options !== "object"){
        let e = new Error(`options should be'object' got ${typeof options}`);
        e.code = "ERR_INVALID_ARG_TYPE";
        throw e;
    }
    if(typeof options.strict !== "boolean"){
        let e = new Error(`options.strict should be 'boolean' got ${typeof options.strict}`);
        e.code = "ERR_INVALID_ARG_TYPE";
        throw e;
    }
    if(typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean"){
        let e = new Error(`value should be 'string | number | boolean' got ${typeof value}`);
        e.code = "ERR_INVALID_ARG_TYPE";
        throw e;
    }

    return Object.entries(this).reduce((arr, [key, v])=>{
        if((v === value) || (options.strict === false && v == value)){
            arr.push(key);
        }
        return arr;
    }, []);

};

//Export functions
module.exports = {

    addProps,
    subProps,
    intersection,
    union,
    get,
    json,
    hasKey,
    withValue
    
};
