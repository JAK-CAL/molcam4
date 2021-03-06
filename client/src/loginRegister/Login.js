import React,{useRef } from 'react';
import axios from "axios";
import { loadReCaptcha, ReCaptcha } from "react-recaptcha-v3";
import $ from "jquery";
import {} from "jquery.cookie"; 
import styled from "styled-components";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };


const Container = styled.div`
position: absolute;
z-index: -998;
top: 0;
right: 0;
width: 100%;
height: 100%;
background: linear-gradient(
    to left,
    rgba(20, 20, 20, 0.1) 10%,
      rgba(20, 20, 20, 0.8) 40%,
      rgba(20, 20, 20, 1)70%
  ),
  url(http://172.10.18.153/static/background1.jpg);
  background-size: cover;`
;

const formStyle = {
    margin: 'auto',
    padding: '10px',
    border: '1px solid #c9c9c9',
    borderRadius: '5px',
    background: '#f5f5f5',
    width: '300px',
      display: 'block'
};

const appStyle = {
  height: '800px',
    display: 'flex'
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

const Login = () => {
    const usernameRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = e => {
        e.preventDefault();
        console.log("username: "+usernameRef.current.value);
        console.log("pw: "+passwordRef.current.value);
        
        if (usernameRef.current.value === "" && passwordRef.current.value=== "") {
            alert("????????? ????????? ??????????????????.");
            usernameRef.current.focus();
            //return;
          } else if (passwordRef.current.value === "") {
            alert("??????????????? ??????????????????.");
            passwordRef.current.focus();
            //return;
          } else{
            const send_param = {
              headers,
              email: usernameRef.current.value,
              password: passwordRef.current.value
            };
            
            axios //????????? ??????
              .post("http://172.10.18.153:80/user/loginapp", send_param) //????????? ??? url ?????? ????????????
              //?????? ??????
              .then(returnData => {
                if (returnData.status === 200) {
                  // console.log("login_id:" + returnData.data._id);
                  $.cookie("login_id", returnData.data._id, { expires: 1 });
                  $.cookie("login_name", returnData.data.name, { expires: 1 });
                  $.cookie("login_email", returnData.data.email, { expires: 1 }); //????????? ?????? ???????????? ???????????? -> ????????? ????????? ????????? ?????? ??????
                  alert(returnData.data.name+"??? ???????????????!");
                  //onSubmit(data);
                  window.location.href="http://localhost:3000/writepost";
                } else {
                    alert("????????? ??????!"); //????????? ??????
                }
              }).catch(err => {
                console.log(err);
                alert("??????!");
              });
              
            
          }
        
    };


    return (
      <Container>
      <div style={appStyle}>
      <form style={formStyle} onSubmit={handleSubmit} >
        <Field ref={usernameRef} placeholder="?????????" type="text" />
        <Field ref={passwordRef} placeholder="????????????" type="password" />
        <ReCaptcha
            sitekey="6LfGieAUAAAAAJSOoqXS5VQdT_e5AH8u0n2e1PDb"
            action="login"
            verifyCallback={verifyCallback}
          />

        <div>
          <button style={submitStyle} type="submit">?????????</button>
        </div>
      </form>
      </div>
      </Container>
    );
};

export default Login;