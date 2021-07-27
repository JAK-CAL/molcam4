const express = require("express");
const db = require("../controllers/userdb");

const router = express.Router();

router.post('/loginapp' , (req,res)=>{
    console.log('user app login');
    db.loginapp(req.body.email, req.body.password , (result)=>{
        if(result != null){ //로그인 성공
            console.log(result)
            const objToSend = {
                _id : result._id,
                name : result.name,
                email : result.email
            }
            res.status(200).send(JSON.stringify(objToSend));
            
        }else{
            console.log("없는 계정입니다!")
            res.status(404).send();
        }
    })
});

router.post('/signupapp' , (req,res)=>{
    console.log('user app sign up');
    db.signupapp(req.body.email ,(result)=>{
        if(result === null){ //회원가입 시킴
            console.log(result)
            db.addOneapp(req.body.name , req.body.email, req.body.password,(result)=>{
                console.log(result)
                res.json({
                    dup: "0"
                })
            })
        }else{
            console.log("이미 있는 계정입니다!")
            res.json({
                dup: "1"
            })
        }
    })
});
//일단 여러번 입력가능하게 구현, 나중에 email 추가로 받아서 한번만 입력가능하게 바꿀 것
router.post('/addOneres', (req,res)=>{
    console.log('has been submitted');
    db.addOneres(req.body.old, req.body.bed, req.body.playg, req.body.futsal, req.body.basket,
        req.body.tenis,req.body.health, req.body.PC,req.body.trans,req.body.taste, req.body.PXdis,
        (result)=>{
            console.log(result)
            res.send(200);
        })
})

module.exports = router;