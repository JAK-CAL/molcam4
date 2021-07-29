const UserModel = require('../models/registermodel');
const ResModel = require('../models/resmodel');

function addOne(pnickName, pemail , callback){
    const newUser = new UserModel({
        nickName : pnickName,
        email : pemail
    });
    newUser.save((err,item)=>{
        callback(item);
    })
}

function loginapp(pemail ,ppassword, callback){
    const query = {
        email : pemail,
        password : ppassword
    }
    UserModel.findOne(query , (err,result)=>{
        callback(result);
    })
}

function signupapp(pemail ,callback){
    const query ={
        email : pemail
    }
    UserModel.findOne(query,(err,result)=>{
        callback(result);
    })
}

function addOneapp(pname, pemail ,ppassword , callback){
    const newUser = new UserModel({
        name : pname,
        email : pemail,
        password: ppassword
    });
    newUser.save((err,item)=>{
        callback(item);
    })
}

function getAll(callback){
    console.log('getAll start')
    UserModel.find({} , (error,result)=>{
        console.log('getAll find');
        callback(result);
    })
}

function checkoutEmail(pemail, callback){
    const query ={
        email : pemail
    }
    ResModel.findOne(query, (err,result)=>{
        callback(result);
    })
}

function addOneres(pold, pbed, pplayg, pfutsal, pbasket, ptenis, pvaca, phealth, pPC, ptrans, ptaste, pPXdis,pemail,callback){
    console.log(pold, pbed, pplayg, pfutsal, pbasket, ptenis, pvaca, phealth, pPC, ptrans, ptaste, pPXdis, pemail)
    const newRes = new ResModel({
        old: pold,
        bed: pbed,
        playg: pplayg,
        futsal: pfutsal,
        basket: pbasket,
        tenis: ptenis,
        vaca: pvaca,
        health: phealth,
        PC: pPC,
        trans: ptrans,
        taste: ptaste,
        PXdis: pPXdis,
        email: pemail
    });
    newRes.save((err,item)=>{
        callback(item);
    })
}

function removeRes(pemail){
    ResModel.deleteOne({email: pemail}, (err) => {
        console.log('error : ', err);
    });
    ResModel.findOne({email: pemail}, (err,result)=>{
        console.log(result);
    })
}

function updateRes(pold, pbed, pplayg, pfutsal, pbasket, ptenis,pvaca, phealth, pPC, ptrans, ptaste, pPXdis,pemail){
    const newRes = new ResModel({
        old: pold,
        bed: pbed,
        playg: pplayg,
        futsal: pfutsal,
        basket: pbasket,
        tenis: ptenis,
        vaca: pvaca,
        health: phealth,
        PC: pPC,
        trans: ptrans,
        taste: ptaste,
        PXdis: pPXdis,
        email: pemail
    });
    var options = {upsert: true};
    ResModel.updateOne({email: pemail}, {
        old: pold,
        bed: pbed,
        playg: pplayg,
        futsal: pfutsal,
        basket: pbasket,
        tenis: ptenis,
        vaca: pvaca,
        health: phealth,
        PC: pPC,
        trans: ptrans,
        taste: ptaste,
        PXdis: pPXdis,
        email: pemail
    },(err) => {
        console.log('error : ', err);
    });
    console.log(newRes);
}

function loadAll(callback){
    const filter = {};
    ResModel.find(filter, (err,result) =>
        callback(result)
    );
}

module.exports = {
    addOne,
    loginapp,
    signupapp,
    addOneapp,
    getAll,
    addOneres,
    checkoutEmail,
    removeRes,
    updateRes,
    loadAll
}