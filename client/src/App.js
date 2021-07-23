import './App.css';
import Login from './Login';
import Register from "./Register";
import Unfulfilled from "./Unfulfilled";
import Fulfilled from './Fulfilled';

import { Route, BrowserRouter, NavLink } from "react-router-dom";

function App() {

  //let resultForm;
    
    
  //getResultForm();
    
  return (
    <div>
      <NavLink to="/login">
        <button>로그인</button>
      </NavLink>
      <NavLink to="/register">
        <button>회원가입</button>
      </NavLink>

      
        <Route path="/login" component={Login}></Route>

        <Route path="/register" component={Register}></Route>
        <Route path = "/register/unfulfilled" component={Unfulfilled}></Route>
        <Route path = "/register/fulfilled" component={Fulfilled}></Route>
        <Route path = "/postboard" component={Postboard}></Route>
      
     
    </div>
  );  
}

/*
const getResultForm = () => {
  // console.log($.cookie("login_id"));
  if ($.cookie("login_id")) { //쿠키 있으면 게시판 보여주고
    resultForm = <Route exact path="/" component={BoardForm}></Route>;
    return resultForm;
  } else { //없으면 로그인 화면 띄어주기
    resultForm = <Route exact path="/" component={LoginForm}></Route>;
    return resultForm;
  }
}*/


export default App;
