import React,{ forwardRef,useState } from 'react';

const inputStyle = {
    margin: '5px 0 10px 0',
    padding: '5px', 
    border: '1px solid #bfbfbf',
    borderRadius: '3px',
    boxSizing: 'border-box',
    width: '100%'
};

const Fulfilled = (props) => {

    const [info, setinfo] = useState({
        email:'',
        id:'',
        name:'',
        password:'',
    });

    const { email,id,name,password } = info;

    const onChange = (e) => {
        console.log(info);
        console.log(e.target.name);
        console.log(e.target.value);
        setinfo({
            ...info,
            [e.target.name]:e.target.value,
        });
        console.log(info);
    }

    const sendEmail = (e) => {
        e.preventDefault();
        console.log(info);
        console.log(info.email);
        const data = {                      //현재의 email state값을 data객체로 감쌌다
            email: info.email
        }
        /*
        fetch('http://localhost:3001/sendEmail',{      //sendEmail 라우터로 보내버리기
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(json => {
            
        })*/
    }

    return (
        <div>
            <div>
          <input
            type="text"
            maxLength="100"
            name="email"
            placeholder="이메일"
            onChange={onChange}
          />
          <button onClick={sendEmail}> 메일 인증 </button>
          </div>
          <input
            type="text"
            maxLength="20"
            name="id"
            placeholder="아이디"
            onChange={onChange}
          />
          <input
            type="text"
            maxLength="20"
            placeholder="이름"
            name="name"
            onChange={onChange}
          />
          <input
            type="password"
            maxLength="64"
            name="passwd"
            placeholder="비밀번호"
            onChange={onChange}
          />
          <button
            type="button"
            block>
                회원가입
            </button>
          
        </div>
    );
}



export default Fulfilled;

/* <ReCaptcha
            sitekey="6LfGieAUAAAAAJSOoqXS5VQdT_e5AH8u0n2e1PDb"
            action="login"
            verifyCallback={verifyCallback}
          />
          */