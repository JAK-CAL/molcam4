import React,{useState,useEffect} from 'react';

import { NavLink,Route } from 'react-router-dom';
import BoardRow from './BoardRow';
import Writepost from './Writepost';
import Head from '../Head';

const Average= () => {
    const [post, setpost] = useState({
        old:"",
        bed:'',
        playg:'',
        futsal:"",
        basket:"",
        tenis:"",
        health:"",
        PC:"",
        trans:"",
        taste:"",
        PXdis:"",
        etc:""
    });

    const {old,bed,playg,futsal,basket,tenis,health,PC,trans,taste,PXdis,etc} = post;

    const makeAvg = (name,value) => {
        return (
            <div>
                {name}
                {value}
            </div>

        )
    }

    return (
        <div>
            {makeAvg("막사 노후도",old)}
            {makeAvg("막사 노후도",bed)}
            {makeAvg("막사 노후도",old)}
        </div>
    )

}

export default Average;