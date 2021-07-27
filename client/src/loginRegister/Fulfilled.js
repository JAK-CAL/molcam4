
import $ from "jquery";
import {} from "jquery.cookie";
import { Route, NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import Head from "../Head";
import Postboard from "../postboard/Postboard"


const Container = styled.div`
position: absolute;
top: 0;
right: 0;
width: 80%;
height: 100%;
z-index: -999;
background: linear-gradient(
    to left,
    rgba(20, 20, 20, 0.1) 10%,
    rgba(20, 20, 20, 0.7) 70%,
    rgba(20, 20, 20, 1)
  ),
  url(http://192.249.18.153/static/background1.jpg);
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

function Fulfilled (){

  let resultForm;
  const setstyle = {
    margin:"20px",
  }

    const getResultForm = () => {
    //console.log($.cookie("login_id"));
    if ($.cookie("login_id")) { //쿠키 있으면 게시판 보여주고
      resultForm = <Route exact path="/fulfilled" component={Postboard}></Route>;
      
    } else { //없으면 로그인 및 회원가입 화면 띄어주기
      
      resultForm = 
      
      
      
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
      
        
     
    }
    return resultForm;
  }

  getResultForm();
  return (
    <div>
    <Head/>
      {resultForm}
      
    </div>
  );  
}

export default Fulfilled;
