import React from 'react';
import { NavLink,Route } from "react-router-dom";
import styled from "styled-components";

const formStyle = {
    margin: 'auto',
    padding: '10px',
    border: '1px solid #c9c9c9',
    borderRadius: '5px',
    background: '#f5f5f5',
    width: '300px',
      display: 'block'
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
const appStyle = {
    height: '800px',
      display: 'flex',
      zIndex: 1,
  };

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
      rgba(20, 20, 20, 0.7) 70%,
      rgba(20, 20, 20, 1)
    ),
    url(http://172.10.18.153/static/background1.jpg);
    background-size: cover;`
  ;

const Unfulfilled = (props) => {
    return(
        
        <Route exact path = "/unfulfilled">
        <Container>
        </Container>    
        <div style={appStyle}>
        <form style={formStyle} >
        <div>
            <h3>회원가입</h3>
                <div>
                    게시판 관리를 위해 병역 의무에 따라
                    다른 서비스를 제공하고 있습니다.
                </div>
                <NavLink to="/tut">
                    <button style={submitStyle}>튜토리얼</button>
                </NavLink>
                <NavLink to="/army">
                    <button style={submitStyle}>글 보기</button>
                </NavLink>
            </div>
            </form>
            </div>
            </Route>
       
    );
}

export default Unfulfilled;