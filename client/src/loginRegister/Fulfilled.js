import React,{ useRef,useState } from 'react';
import axios from "axios"; //http 라이브러리, http를 비동기 통신할때?
import $ from "jquery";
import {} from "jquery.cookie"; //로그인, 로그아웃 처리 할때 (쿠키 있 : 게시글 보여줌 / 쿠키 없 : 로그인, 회원가입 창 보여줌)
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

const inputStyle = {
    margin: '5px 0 10px 0',
    padding: '5px', 
    border: '1px solid #bfbfbf',
    borderRadius: '3px',
    boxSizing: 'border-box',
    width: '100%'
};

const Fulfilled = (props) => {
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const regExp2 = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

    const [info, setinfo] = useState({
        email:'',
        name:'',
        password:'',
    });

    const nameInput = useRef();
    const pwInput = useRef();
    const mailInput = useRef();

    const { email,name,password } = info;

    const register = () => {
      console.log(info);
      if (email === "" || email === undefined) {
        alert("이메일 주소를 입력해주세요.");
        nameInput.current.focus();
        return;
      } else if (
        email.match(regExp) === null ||
        email.match(regExp) === undefined
      ) {
        alert("이메일 형식에 맞게 입력해주세요.")
        setinfo({
          ...info,
          "email":"",
        });
        console.log(info.email);
        console.log(info);
        return;
      } else if (name === "" || name === undefined) {
        alert("이름을 입력해주세요.");
        nameInput.current.focus();
        return;
      } else if (password === "" || password === undefined) {
        alert("비밀번호를 입력해주세요.");
        pwInput.current.focus();
        return;
      } else if (
        password.match(regExp2) === null ||
        password.match(regExp2) === undefined
      ) {
        alert("비밀번호를 숫자와 문자, 특수문자 포함 8~16자리로 입력해주세요.");
        setinfo({
          ...info,
          "password":"",
        });
        pwInput.current.focus();
        return;
      }
  
      const send_param = { //파라미터들을 모아놓은 send_param 변수를 보내는 ?
        headers,     //동일 기원..? 통신 할때만다 먼저 넘겨주기
        email: email,
        name: name,
        password: password
      };
      axios
        .post("http://192.249.18.151:80/member/join", send_param)
        //정상 수행
        .then(returnData => { 
          if (returnData.data.message) {
            alert(returnData.data.message);
            //이메일 중복 체크
            if (returnData.data.dupYn === "1") { 
              setinfo({
                ...info,
                "email":"",
              });
              mailInput.current.focus()
            } else { 
              
              setinfo({
                ...info,
                "email" : "",
                "name" : "",
                "password":"",
              });
              
            }
          } else {
            alert("회원가입 실패");
          }
        })
        //에러
        .catch(err => {
          console.log(err);
        });


    }

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
            ref={mailInput}
            onChange={onChange}
          />
          <button onClick={sendEmail}> 메일 인증 </button>
          </div>
          <input
            type="text"
            maxLength="20"
            placeholder="이름"
            name="name"
            ref={nameInput}
            onChange={onChange}
          />
          <input
            type="password"
            maxLength="64"
            name="password"
            ref={pwInput}
            placeholder="비밀번호"
            onChange={onChange}
          />
          <button
            type="button"
            onClick={register}>
                회원가입
            </button>
          
            <div>
          <b>값: </b>
          {name} ({email})
        </div>
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