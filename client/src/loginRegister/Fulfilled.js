
import $ from "jquery";
import {} from "jquery.cookie";
import { Route, NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import Head from "../Head";
import Postboard from "../postboard/army"


const Container = styled.div`
position: absolute;
top: 0;
right: 0;
width: 100%;
height: 100%;
z-index: -999;
background: linear-gradient(
    to left,
    rgba(20, 20, 20, 0.1) 10%,
      rgba(20, 20, 20, 0.8) 40%,
      rgba(20, 20, 20, 1)70%
  ),
  url(http://192.249.18.153/static/background1.jpg);
background-size: cover;`
;


const Button = styled.button`
background-color: white;
  color: black;
  font-size: 40px;
  margin-left: 19.5%;
  margin-top: 2%;
  padding-top: 5px;
  padding-bottom: 5px;
  /* margin: 10px 10px 10px 10px; */
  width: 17%;
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
  
      
      resultForm =
      <Container>
      <h1 class = "title">요즘 군대가 군대냐</h1>
        <div style ={
          setstyle 
        }>
        <div>
          <NavLink to="/login">
          <Button>로그인</Button>
        </NavLink>
        </div>
        <div>
        <NavLink to="/register">
          <Button>회원가입</Button>
        </NavLink>
        </div>
        </div>
        
      </Container>
     
    
    return resultForm;
  }

  getResultForm();
  return (
    <div>
   
      {resultForm}
    </div>
  );  
}

export default Fulfilled;
