import React,{ useState } from 'react';
import Form from "./LoginForm";

function Login(props){
    
    const appStyle = {
        height: '250px',
          display: 'flex'
      };

    const handleSubmit = data => {
        const json = JSON.stringify(data, null, 4);
        console.clear();
        console.log(json);
    };

    return (
        <div style={appStyle}>
            <Form onSubmit={handleSubmit} />
        </div>
    );
}


//onChange={this.handleChange} onChange={this.handleChange}
export default Login;