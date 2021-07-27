import React,{ useState } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { loadReCaptcha, ReCaptcha } from "react-recaptcha-v3";
import $ from "jquery";
import {} from "jquery.cookie"; 
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

const formStyle = {
    margin: 'auto',
    padding: '10px',
    border: '1px solid #c9c9c9',
    borderRadius: '5px',
    background: '#f5f5f5',
    width: '300px',
      display: 'block'
};

const labelStyle = {
    margin: '10px 0 5px 0',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '15px',
};

const inputStyle = {
    margin: '5px 0 10px 0',
    padding: '5px', 
    border: '1px solid #bfbfbf',
    borderRadius: '3px',
    boxSizing: 'border-box',
    width: '100%'
};

const submitStyle = {
    margin: '10px 0 0 0',
    padding: '7px 10px',
    border: '1px solid #efffff',
    borderRadius: '3px',
    background: '#3085d6',
    width: '100%', 
    fontSize: '15px',
    color: 'white',
    display: 'block'
};

const Field = React.forwardRef(({placeholder, type}, ref) => {
    return (
      <div>
        <input ref={ref} type={type} placeholder={placeholder} style={inputStyle} />
      </div>
    );
});

const verifyCallback = recaptchaToken => {
    // Here you will get the final recaptchaToken!!!
    console.log(recaptchaToken, "<= your recaptcha token");
  };

const Form = ({onSubmit}) => {
    const usernameRef = React.useRef();
    const passwordRef = React.useRef();
    let history = useHistory();


    const handleSubmit = e => {
        e.preventDefault();
        console.log("username: "+usernameRef.current.value);
        console.log("pw: "+passwordRef.current.value);
        
        if (usernameRef.current.value === "" && passwordRef.current.value=== "") {
            alert("이메일 주소를 입력해주세요.");
            //usernameRef.focus();
            //return;
          } else if (passwordRef.current.value === "") {
            alert("비밀번호를 입력해주세요.");
            //passwordRef.focus();
            //return;
          } else{
            const send_param = {
              headers,
              email: usernameRef.current.value,
              password: passwordRef.current.value
            };
            
            axios //비동기 통신
              .post("http://172.10.18.153:80/user/loginapp", send_param) //서버에 저 url 주소 보내주기
              //정상 수행
              .then(returnData => {
                if (returnData.status === 200) {
                  // console.log("login_id:" + returnData.data._id);
                 
                  alert(returnData.data.name+"님 환영합니다!");
                  //window.location.reload();
                  console.log(returnData);
                  //onSubmit(data);
                  history.goBack();
                } else {
                    alert("로그인 실패!"); //로그인 실패
                }
              }).catch(err => {
                console.log(err.response.status);
                alert("오류!");
              });
              
            
          }
        
    };


    return (
      <form style={formStyle} onSubmit={handleSubmit} >
        <Field ref={usernameRef} placeholder="아이디" type="text" />
        <Field ref={passwordRef} placeholder="비밀번호" type="password" />
        <ReCaptcha
            sitekey="6LfGieAUAAAAAJSOoqXS5VQdT_e5AH8u0n2e1PDb"
            action="login"
            verifyCallback={verifyCallback}
          />

        <div>
          <button style={submitStyle} type="submit">로그인</button>
        </div>
      </form>
    );
};

export default Form;