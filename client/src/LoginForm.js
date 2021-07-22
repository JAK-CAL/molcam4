import React,{ useState } from 'react';
import { loadReCaptcha, ReCaptcha } from "react-recaptcha-v3";

const formStyle = {
    margin: 'auto',
    padding: '10px',
    border: '1px solid #c9c9c9',
    borderRadius: '5px',
    background: '#f5f5f5',
    width: '220px',
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

const Field = React.forwardRef(({label, type}, ref) => {
    return (
      <div>
        <label style={labelStyle} >{label}</label>
        <input ref={ref} type={type} style={inputStyle} />
      </div>
    );
});

const validateForm = (Id,Pw) => {
    return Id.length > 0 && Pw.length > 0;
}

const verifyCallback = recaptchaToken => {
    // Here you will get the final recaptchaToken!!!
    console.log(recaptchaToken, "<= your recaptcha token");
  };

const Form = ({onSubmit}) => {
    const usernameRef = React.useRef();
    const passwordRef = React.useRef();
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
          }else{
            const data = {
                username: usernameRef.current.value,
                password: passwordRef.current.value
            };
            onSubmit(data);
          }
        
    };


    


    return (
      <form style={formStyle} onSubmit={handleSubmit} >
        <Field ref={usernameRef} label="Username:" type="text" />
        <Field ref={passwordRef} label="Password:" type="password" />
        <ReCaptcha
            sitekey="6LfGieAUAAAAAJSOoqXS5VQdT_e5AH8u0n2e1PDb"
            action="login"
            verifyCallback={verifyCallback}
          />

        <div>
          <button style={submitStyle} type="submit">Submit</button>
        </div>
      </form>
    );
};

export default Form;