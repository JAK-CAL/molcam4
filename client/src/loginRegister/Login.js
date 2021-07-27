import React,{ useState } from 'react';
import Form from "./LoginForm";
import styled from "styled-components";

function Login(props){
    const Container = styled.div`
  position: absolute;
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
    
    const appStyle = {
        height: '800px',
          display: 'flex'
      };

    const handleSubmit = data => {
        const json = JSON.stringify(data, null, 4);
        console.clear();
        console.log(json);
    };

    return (
        <Container>
        <div style={appStyle}>
            <Form onSubmit={handleSubmit} />
        </div>
        </Container>
    );
}


//onChange={this.handleChange} onChange={this.handleChange}
export default Login;