import './App.css';
import Login from './loginRegister/Login';
import Register from "./loginRegister/Register";
import Unfulfilled from "./loginRegister/Unfulfilled";
import Fulfilled from './loginRegister/Fulfilled';
import Detail from "./postboard/Detail";


import { Route, NavLink } from "react-router-dom";
import Writepost from './postboard/Writepost';



function App() {

  //let resultForm;
    
  /* 
  const getResultForm = () => {
    // console.log($.cookie("login_id"));
    if ($.cookie("login_id")) { //쿠키 있으면 게시판 보여주고
      resultForm = <Route exact path="/" component={Board}></Route>;
      return resultForm;
    } else { //없으면 로그인 및 회원가입 화면 띄어주기
      resultForm = <Route exact path="/" component={LoginForm}></Route>;
      return resultForm;
    }
  }*/
    
  //getResultForm();
    
  return (
    <div>
      <Route exact path = "/">
        <NavLink to="/login">
          <button>로그인</button>
        </NavLink>
        <NavLink to="/register">
          <button>회원가입</button>
        </NavLink>
      </Route>
      
      <Route path="/login" component={Login}></Route>
      <Route path="/register" component={Register}></Route>
      <Route path = "/register/unfulfilled" component={Unfulfilled}></Route>
      <Route path = "/register/fulfilled" component={Fulfilled}></Route>
      <Route path = "/writepost" component={Writepost}></Route>
      <Route path = "/army/detail" component={Detail}></Route>
     
    </div>
  );  
}




export default App;
