const expect = require("expect");

let AlterSet = require("../index.js");
let { func } = require("../index.js");
let asInst;

before((done)=>{

    let obj = {1:2, 3:4, 5:6, 7:8, 10:2};
    asInst = new AlterSet(obj);
    done();

});

it("Should test addGlobal func", ()=>{
    let obj = {1:2, 3:4, 5:6, 7:8};
    func.addGlobal(obj);
    let a = new Object({7:9});
    expect(a["1"]).toBe(2);
    expect(a["7"]).toBe(9);
});

it("Should test fromJson func", ()=>{
    let json = "{\"1\":2, \"3\":\"4\", \"5\":6, \"7\":\"Hello World\"}";
    let obj = func.fromJson(json);
    expect(obj["1"]).toBe(2);
    expect(obj["7"]).toBe("Hello World");
});

it("Should test sort func (Success)", ()=>{
    let arr = [1, 2, 5, -1, 5];
    let ascArr = func.sort(arr);
    let descArr = func.sort(arr, "DESC");
    expect(ascArr).toEqual([-1, 1, 2, 5, 5]);
    expect(descArr).toEqual([5, 5, 2, 1, -1]);
});

it("Should test sort func (Failure)", ()=>{
    let arr = [1, 2, 3, 4, 5];
    try{
        func.sort(arr, null); //pass string
    } catch(err){
        expect(err.code).toBe("ERR_INVALID_ARG_TYPE");
    }

    try{
        func.sort(arr, "asc"); //should be "ASC" or "DESC" (case-sensetive)
    } catch(err){
        expect(err.code).toBe("ERR_INVALID_ARG_VALUE");
    }
});

it("Should test addProps proto", ()=>{
    let obj = {1:2, 3:4, 5:6, 7:8};
    let f = asInst.addProps(AlterSet({1:5, 6:1, 7:0}), obj);
    expect(f["1"]).toBe(9);
    expect(f["6"]).toBe(1);
    expect(f["7"]).toBe(16);
    expect(f["3"]).toBe(8);
    expect(f["5"]).toBe(12);
});

it("Should test subProps proto", ()=>{
    let obj = {1:2, 3:4, 5:6, 7:8};
    let f = asInst.subProps(AlterSet({1:5, 6:1, 7:0}), obj);
    expect(f["1"]).toBe(-5);
    expect(f["6"]).toBe(-1);
    expect(f["7"]).toBe(0);
    expect(f["3"]).toBe(0);
    expect(f["5"]).toBe(0);
});

it("Should check intersection", ()=>{
    let arr = ["1", "2", "3", "4", "x"];
    asInst.__proto__.x = 7;
    let obj = asInst.intersection(arr);
    expect(Object.keys(obj)).toEqual(["1", "3", "x"]);
    obj = asInst.intersection(arr, {protoLookup:false});
    expect(Object.keys(obj)).toEqual(["1", "3"]);
    expect(typeof obj.intersection).toEqual("undefined");
    obj = asInst.intersection(arr, {protoLookup:false, unref:false});
    expect(typeof obj.intersection).toEqual("function");
});

it("Should test union proto", ()=>{
    let obj = {1:7, 8:9};
    let f = asInst.union(obj);
    expect(f["8"]).toBe(9);
    expect(f["1"]).toBe(7);
    expect(asInst["8"]).toBe(9);
    asInst = AlterSet({1:2});
    f = asInst.union(obj, {unref:true});
    expect(f["8"]).toBe(9);
    expect(typeof asInst["8"]).toBe("undefined");
});

it("Should test get proto", ()=>{
    let v = asInst.get("1", null);
    expect(v).not.toBe(null);
    v = asInst.get("7", 11);
    expect(v).toEqual(11);
});

it("Should test json proto", ()=>{
    let json = asInst.json();
    expect(JSON.parse(json)["1"]).toBe(2);
});

it("Should test hasKey proto", ()=>{
    expect(asInst.hasKey("1")).toBeTruthy();
    expect(asInst.hasKey("9")).toBeFalsy();
});

it("Should test withValue proto", ()=>{
    asInst[10] = 2;
    asInst[5] = 7;
    let arr = asInst.withValue(2);
    expect(arr).toEqual(["1", "10"]);
});

it("Should test sort proto", ()=>{
    let arr = asInst.sort();
    expect(arr).toEqual(["1", "10", "5"]);
    arr = asInst.sort({order:"DESC"});
    expect(arr).toEqual(["5", "1", "10"]);
    arr = asInst.sort({returns:"values"});
    expect(arr).toEqual([2, 2, 7]);
    arr = asInst.sort({returns:"values", order:"DESC"});
    expect(arr).toEqual([7, 2, 2]);
});

it("Should test sort proto (failure)", ()=>{
    try{
        asInst.sort({returns: "asc"});
    } catch(err){
        expect(err.code).toEqual("ERR_INVALID_ARG_VALUE");
    }
    
    try{
        asInst.sort({returns: 1});
    } catch(err){
        expect(err.code).toEqual("ERR_INVALID_ARG_TYPE");
    }

    try{
        asInst.sort({order:1});
    } catch(err){
        expect(err.code).toEqual("ERR_INVALID_ARG_TYPE");
    }

    try{
        asInst.sort(null);
    } catch(err){
        expect(err.code).toEqual("ERR_INVALID_ARG_TYPE");
    }
});

it("Should test getMax proto", ()=>{
    let k = asInst.getMax();
    expect(k).toEqual(["5"]);
});

it("Should test getMin proto", ()=>{
    let k = asInst.getMin();
    expect(k).toEqual(["1", "10"]);
});

