import React from 'react';
import { NavLink,Route } from "react-router-dom";


const Register = (props) => {

    return(
        
            <Route exact path = "/register">
            <div>
                회원가입
                <div>
                    게시판 관리를 위해 병역 의무에 따라 다른 서비스를 제공하고 있습니다.
                </div>
                <NavLink to="register/unfulfilled">
                    <button>미필</button>
                </NavLink>
                <NavLink to="register/fulfilled">
                    <button>군필</button>
                </NavLink>
            </div>
            </Route>
       
    );
}

export default Register;