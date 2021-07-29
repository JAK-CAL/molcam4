import React,{useState,useEffect} from 'react';

import { NavLink,Route } from 'react-router-dom';
import BoardRow from './BoardRow';
import Writepost from './Writepost';
import Head from '../Head';
import axios from 'axios';

const Average= () => {
    const [post, setpost] = useState({
        old:0,
        bed:"",
        playg:'',
        futsal:"",
        basket:"",
        tenis:"",
        vaca:0,
        health:0,
        PC:0,
        trans:0,
        taste:0,
        PXdis:0,
        etc:""
    });



    let [avg_old,avg_vac,avg_pc,avg_trans,avg_taste,avg_PXdis,avg_health] = [0,0,0,0,0,0,0,0];
    const {old,bed,playg,futsal,basket,tenis,vaca,health,PC,trans,taste,PXdis,etc} = post;

    useEffect(()=> {
        handleLoadAll();
    },[]);

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
                    

                    for(let i =0; i<returnData.data.length; i++){
                        avg_old += parseInt(returnData.data[i].old);
                        avg_vac += parseInt(returnData.data[i].vaca);
                        avg_pc += parseInt(returnData.data[i].PC);
                        avg_trans += parseInt(returnData.data[i].trans);
                        avg_taste += parseInt(returnData.data[i].taste);
                        avg_PXdis += parseInt(returnData.data[i].PXdis);
                        avg_health += parseInt(returnData.data[i].health);
                        console.log(avg_vac+" " +returnData.data[i])
                    }
                    avg_old /= returnData.data.length;
                    avg_vac /= returnData.data.length;
                    avg_pc /= returnData.data.length;
                    avg_trans /= returnData.data.length;
                    avg_taste /= returnData.data.length;
                    avg_PXdis /= returnData.data.length;
                    avg_health /= returnData.data.length;
                    setpost({
                        ...post,
                        "old":avg_old,
                        "vaca":avg_vac,
                        "PC":avg_pc,
                        "trans":avg_trans,
                        "taste":avg_taste,
                        "PXdis":avg_PXdis,
                        "health":avg_health,
                    })
                    //alert('load');
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