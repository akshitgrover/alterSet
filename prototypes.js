"use strict";

const sortArray = require("./functions.js")().sort;

/**
 * Add values of properties which are common between all objects, others remain as it is.
 * @memberof AlterSet
 * @instance
 * @param {AlterSet[] | Object[]} arr - Array of objects to add properties of
 * @returns {Object} - Values will be sum of individual values of passed object
 */
let addProps = function(...arr){

    let f = Object.create(this);
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
 * @memberof AlterSet
 * @instance
 * @param {AlterSet[] | Object[]} arr - Array of objects to subtract properties of
 * @returns {Object} - Values will be `Instance Value` - `Sum of passed object values` of individual values of passed object
 */
let subProps = function(...arr){

    let f = Object.create(this);
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
 * @memberof AlterSet
 * @instance
 * @param {Array} arr - Properties array.
 * @param {Object} [options={unref:true, protoLookup:true}] - Object containing control params
 * @param {Boolean} [options.unref=true] - `true` to reserve protochain
 * @param {Boolean} [options.protoLookup=true] - `true` to look in protochain for value
 * @return {Object} - An object with keys which are passed in array.
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
 * @memberof AlterSet
 * @instance
 * @param {AlterSet | Object} obj - Object to append key value paris of
 * @param {Object} [options={unref:false}] - Object containing control params
 * @param {Boolean} [options.unref=false] - `true` to create new object else modify `this`
 * @returns {Object} - An concatinated object `Instance` U `Passed Object`
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
 * @memberof AlterSet
 * @instance
 * @param {String} key - Property to search for
 * @param {*} [d] - Value to return in case of miss
 * @returns {*} - Value against a Key in the object
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
 * @memberof AlterSet
 * @instance
 * @returns {String} - Object to JSON
 */
let json = function(){
    return JSON.stringify(this);
};

/**
 * Intuitive way of checking key existence
 * @memberof AlterSet
 * @instance
 * @param {String} key - Key to check existence of
 * @returns {Boolean} - True/False
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
 * @memberof AlterSet
 * @instance
 * @param {String | Number} value - Value to search the keys for
 * @param {Object} options - Object with control params
 * @param {Boolean} options.strict - Flag to switch between strict/unstrict value matching
 * @returns {Array} - Array of keys matching a certain value
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

/**
 * Get array of keys, in Ascending or Descending order of values
 * @param {Object} [options] - Object containing control params
 * @param {String} [options.order=ASC] - Ascending `ASC` or Descending `DESC`
 * @param {String} [options.returns=keys] - Array of Keys || Value
 * @memberof AlterSet
 * @instance
 * @returns {Array} - Either array of `keys` or `values` based on value of returns
 */
let sort = function(options = {}){
    
    if(!options || typeof options !== "object"){
        let e = new Error(`options should be 'object' got ${typeof options}`);
        e.code = "ERR_INVALID_ARG_TYPE";
        throw e;
    }
    let order = options.order || "ASC";
    let returns = options.returns || "keys";
    if(typeof order !== "string"){
        let e = new Error(`order shoule be 'string' got ${typeof order}`);
        e.code = "ERR_INVALID_ARG_TYPE";
        throw e;
    }
    if(typeof returns !== "string"){
        let e = new Error(`returns should be 'string' got ${typeof order}`);
        e.code = "ERR_INVALID_ARG_TYPE";
        throw e;
    }
    if(returns !== "keys" && returns !== "values"){
        let e = new Error(`value of return should be 'keys' or 'values' got ${order}`);
        e.code = "ERR_INVALID_ARG_VALUE";
        throw e;
    }

    let values = Object.values(this);
    let finalArr = [];
    let sortedArr = sortArray(values, order);
    if(returns === "values"){
        return sortedArr;
    }

    for(let i in sortedArr){
        let v = sortedArr[i];
        if((typeof v === "string" || typeof v === "number" || typeof v === "boolean") && v !== sortedArr[i - 1]){
            finalArr = finalArr.concat(this.withValue(v));
        } else{
            continue;
        }
    }
    return finalArr;

};

/**
 * Get key of maximum value
 * @memberof AlterSet
 * @instance
 * @returns {Array} - Array of keys with the maximum value 
 */
let getMax = function(){

    let arr = sortArray(Object.values(this));
    let maxVal = arr[arr.length - 1];
    let maxKey = this.withValue(maxVal);
    return maxKey;

};

/**
 * Get key of minimu value
 * @memberof AlterSet
 * @instance
 * @returns {Array} - Array of keys with the maximum value 
 */
let getMin = function(){
    let arr = sortArray(Object.values(this));
    let minKey = this.withValue(arr[0]);
    return minKey;
}

//Export functions
module.exports = {

    addProps,
    subProps,
    intersection,
    union,
    get,
    json,
    hasKey,
    withValue,
    sort,
    getMax,
    getMin
    
};
