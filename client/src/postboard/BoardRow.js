import react from "react";
import { NavLink } from "react-router-dom";

const BoardRow = (props) => {
    console.log(props);
    
    return( 
    <tr>
        <NavLink to={{ pathname: "/army/detail", query: { _id: props._id } }}>
            <td>{props.unit}</td> 
        </NavLink>
        <NavLink to={{ pathname: "/army/detail", query: { _id: props._id } }}>
            <td>{props.createdAt}</td>
        </NavLink>
    </tr> 
    );
}


export default BoardRow;
