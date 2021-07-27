import './App.css';
import Login from './loginRegister/Login';
import Register from "./loginRegister/Register";
import Unfulfilled from "./loginRegister/Unfulfilled";
import Fulfilled from './loginRegister/Fulfilled';
import Detail from "./postboard/Detail";

import styled from "styled-components";
import $ from "jquery";
import {} from "jquery.cookie";
import {Navigation} from 'react-minimal-side-navigation';
import { Route, NavLink, Link } from "react-router-dom";
import Writepost from './postboard/Writepost';
import Postboard from './postboard/Postboard';



function App() {

  let resultForm;
  const setstyle = {
    margin:"20px",
  }
  
  const SubNavigation = (items) => {
    console.log("템"+items.subNav);
    // Here I’m trying to return if the props are not present
    if(!items) return null;
    return (<ul>
        {items.map((item, index) => {
          return <Link key={index} to={item.path}>{item.name}</Link>
        })}
      </ul>
    );
  }
  
  const items=
    [{
      title: '육군',
      itemId: '/army',
      subNav: [
        {
          title: '제8기동사단',
          itemId: '/army/8',
          subNav:[
            {
              title: "사단직할대",
              itemID: "/army/8/dir",
              subNav:
                [
                  {
                    title: "정보통신대대",
                    itemID: "/army/8/dir/info",
                    
                  }
                ]
              },
          ]
        },
      ],
    },]
  
  const getResultForm = () => {
    console.log($.cookie("login_id"));
   //없으면 로그인 및 회원가입 화면 띄어주기
      resultForm = 
      
      <Route exact path = "/">
        
      <Container>
        <Sidebar>
        <div style ={
          setstyle 
        }>
          <h2 >TEST</h2>

          
        <NavLink to="/login">
          <Button>로그인</Button>
        </NavLink>
        
        <NavLink to="/register">
          <Button>회원가입</Button>
        </NavLink>
        </div>
        </Sidebar>
        </Container>
      </Route>
        
     
    
    return resultForm;
  }

  const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 80%;
  height: 100%;
  background: linear-gradient(
      to left,
      rgba(20, 20, 20, 0.1) 10%,
      rgba(20, 20, 20, 0.7) 70%,
      rgba(20, 20, 20, 1)
    ),
    url(http://172.10.18.153/static/background1.jpg);
  background-size: cover;`
  ;

  const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  margin: 10px 10px 10px 10px;
  width: 95%;
  cursor: pointer;`;

  const Sidebar = styled.div`
    position: fixed;
    color:black;
    background-color: black;
    z-index: 9;
    left: 0;
    top: 0;
    width:20%;
    height: 100%;
    overflow-y: auto;
    -ms-overflow-style: none;
    border-left: 1px solid #d6d6d6;
    font-family: "맑은 고딕", "돋움", "Apple SD Gothic Neo", sans-serif;
    background-color: #fff;
    `
  

  getResultForm();
    
  return (
    <div>
      
      {resultForm}
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
