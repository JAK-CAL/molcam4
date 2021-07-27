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

function addOneres(pold, pbed, pplayg, pfutsal, pbasket, ptenis, phealth, pPC, ptrans, ptaste, pPXdis,callback){
    const newRes = new ResModel({
        old: pold,
        bed: pbed,
        playg: pplayg,
        basket: pbasket,
        tenis: ptenis,
        health: phealth,
        PC: pPC,
        trans: ptrans,
        taste: ptaste,
        PXdis: pPXdis
    });
    newRes.save((err,item)=>{
        callback(item);
    })
}

module.exports = {
    addOne,
    loginapp,
    signupapp,
    addOneapp,
    getAll,
    addOneres
}