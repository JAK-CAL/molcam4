const express = require("express");
const db = require("../controllers/userdb");

const router = express.Router();

router.post('/loginapp' , (req,res)=>{
    console.log('user app login');
    db.loginapp(req.body.email, req.body.password , (result)=>{
        if(result != null){ //로그인 성공
            const objToSend = {
                nickName : result.nickName,
                email : result.email
            }
            res.status(200).send(JSON.stringify(objToSend));
            res.set({'access-control-allow-origin': '*'});
        }else{
            res.status(404).send();
        }
    })
});

router.post('/signupapp' , (req,res)=>{
    console.log('user app sign up');
    db.signupapp(req.body.email ,(result)=>{
        if(result == null){ //회원가입 시킴
            db.addOneapp(req.body.name , req.body.email, req.body.password,(result)=>{
                res.json({
                    dupYn: "1"
                })
            })
            res.set({'access-control-allow-origin': '*'});
        }else{
            res.status(404).send();
        }
    })
})


module.exports = router;