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
    db.checkoutEmail(req.body.email, (result)=>{
        if(result === null){
            db.addOneres(req.body.post.old, req.body.post.bed, req.body.post.playg, req.body.post.futsal, req.body.post.basket, 
                req.body.post.tenis,req.body.post.health, req.body.post.PC,req.body.post.trans,req.body.post.taste, req.body.post.PXdis,req.body.email,
                (result)=>{
                    console.log(result)
                    console.log("제출되었습니다")
                    res.json({
                        dup2: "0"
                    });
                })
        }else{
            console.log('중복제출금지')
            res.json({
                dup2: "1"
            });
        }
    })
})

router.post('/loadres', (req,res)=>{
    db.checkoutEmail(req.body.email, (result)=>{
        if(result === null){
            console.log('설문을 작성하세요.')
        }
        else{
            console.log('예전에 작성한 설문결과입니다.')
            console.log(result)
            res.json({
                result
            })
        }
    })
})

router.post('/remove', (req,res)=>{
    db.removeRes(req.body.email)
    res.status(200).send()
})

module.exports = router;