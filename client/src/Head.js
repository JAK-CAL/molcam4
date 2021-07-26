import React, {useState} from 'react';
import {Route,Router,Link} from "react-router-dom";

import Postboard from './postboard/Postboard';

import $ from "jquery";
import {} from "jquery.cookie";



const Head = () => {
  const [boardname,setboard] = useState('');
  
  const handleSubmit = e => {
    //setboard(e.target);
    setboard(e.target.name);
  }
  if ($.cookie("login_id")) {
    return (
  <div>
    <ul>
      <nav>
        <div>
          <img src={require("./img/logo.jpg")}/>
          <Link to="/">부대 리뷰</Link>    
        </div>
      </nav>
    </ul>
    <div>
      <Link to="/army" name="육군게시판" onClick={handleSubmit}>육군</Link>
    </div>
    <Route path="/army"  render = {() => <Postboard name={boardname}/>}></Route>      
  </div>
    ); 
   
} else{
  return null;
}
}

/* 
<Container>
          <Navbar.Brand href="/"><strong><big>SCRUM for Mad Camp</big></strong></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink to={{pathname: "/mypage", query: { _id: $.cookie("login_id")}}}>
              <Button variant="primary" style={buttonStyle}>
                Mypage
              </Button>
            </NavLink>
            <NavLink to="/">
              <Button variant="primary" style={buttonStyle}>
                list
              </Button>
            </NavLink>
            <NavLink to="/boardWrite">
              <Button variant="primary" style={buttonStyle}>
                write
              </Button>
            </NavLink>
            <NavLink to="/imageupload">
              <Button style={buttonStyle} variant="primary">
                image
              </Button>
            </NavLink>
            <NavLink to="/calendar">
              <Button variant="primary" style={buttonStyle}>
                todo
              </Button>
            </NavLink>
            <div><Button onClick={this.logout} variant="secondary" style={buttonStyle}>
              logout
            </Button></div>
            
            </Nav>
          </Navbar.Collapse>
          </Container>*/

/*
<Route path="/airforce" component={Army}></Route>
        <Route path="/navy"  component={Army}></Route>
        <Route path="/marine" component={Army}></Route>
        <Route path="/social" component={Army}></Route>
        <Route path="/industry" component={Army}></Route>
        <Route path="/research" component={Army}></Route>

*/ 


export default Head;