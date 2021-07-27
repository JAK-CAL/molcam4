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
            console.log("회원가입 오류!")
            res.status(404).send();
        }
    })
});


module.exports = router;