const express = require("express");
const router = express.Router();
const { smtpTransport } = require('../config/email');



router.post('/sendEmail', async function (req, res) {

    let user_email = req.body.email;     //받아온 email user_email에 초기화

    console.log(user_email);

    let number = Math.floor(Math.random() * 1000000)+100000; // ★★난수 발생 ★★★★★
    if(number>1000000){                                      // ★★
       number = number - 100000;                             // ★★
    }
    // 메일발송 함수

    let transporter = nodemailer.createTransport({
        service: 'gmail'              //사용하고자 하는 서비스
        , prot: 587
        , host: 'smtp.gmlail.com'
        , secure: false
        , requireTLS: true
        , auth: {
            user: '구글@gmail.com'           //gmail주소입력
            , pass: '비밀번호1234'                 //gmail패스워드 입력
        }
    });

    let info = await transporter.sendMail({   
        from: '구글@gmail.com',             //보내는 주소 입력
        to: user_email,                        //위에서 선언해준 받는사람 이메일
        subject: '안녕하세요',                  //메일 제목
        text: 'ㅁㄴㅇㄹ',                       //내용
      });

      
    let checkemail = await new Object();
    checkemail.number = number;        // checkemail 객체를 따로 만들고

    await res.send(checkemail);    


})

module.exports = router;