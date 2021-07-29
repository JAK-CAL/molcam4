import React,{useState,useEffect} from 'react';

import { NavLink,Route } from 'react-router-dom';
import BoardRow from './BoardRow';
import Writepost from './Writepost';
import Head from '../Head';
import axios from 'axios';

const Average= () => {
    const [post, setpost] = useState({
        old:"",
        bed:'',
        playg:'',
        futsal:"",
        basket:"",
        tenis:"",
        vaca:"",
        health:"",
        PC:"",
        trans:"",
        taste:"",
        PXdis:"",
        etc:""
    });

    const {old,bed,playg,futsal,basket,tenis,vaca,health,PC,trans,taste,PXdis,etc} = post;

    const makeAvg = (name,value) => {
        return (
            <div>
                {name}
                {value}
            </div>

        )
    }

    const handleLoadAll = () => {

      
        axios
            .post("http://192.249.18.153:80/user/loadAll")
            .then(returnData=>{
                if(returnData.status === 200){
                    let avg_old = 0;

                    for(let i =0; i<returnData.data.length; i++){
                        avg_old += parseInt(returnData.data[i].old);
                    }
                    avg_old /= returnData.data.length;

                    alert('load');
                    console.log(returnData)
                    console.log(`데이터 개수는${returnData.data.length}`)
                    console.log(`막사노후도 평균은${avg_old}`);
                }
            })
    }

    return (
        <div>
            {makeAvg("막사 노후도",old)}
            {makeAvg("휴가",vaca)}
            {makeAvg("헬스장",health)}
            {makeAvg("피시방 거리",PC)}
            {makeAvg("교통",trans)}
            {makeAvg("밥",taste)}
            {makeAvg("PX",PXdis)}
            <button onClick = {handleLoadAll}>불러오기</button>
        </div>
        
    )

}

export default Average;