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
        soil:"",
        grass:'',
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
    let [cnt_bed,cnt_soil,cnt_grass,cnt_futsal,cnt_tenis] = [0,0,0,0,0];
    const {old,bed,soil,grass,futsal,basket,tenis,vaca,health,PC,trans,taste,PXdis,etc} = post;

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
                console.log(returnData)
                if(returnData.status === 200){
                    for(let i =0; i<returnData.data.length; i++){
                        if (returnData.data[i].bed === "bed") cnt_bed++;
                        if (returnData.data[i].grass !== "") cnt_grass++;
                        if (returnData.data[i].soil !== "") cnt_soil++;
                        if (returnData.data[i].futsal !== "") cnt_futsal++;
                        if (returnData.data[i].tenis !== "") cnt_tenis++;

                        avg_old += parseInt(returnData.data[i].old);
                        //avg_vac += parseInt(returnData.data[i].vaca);
                        //vac data가 없어서 오류나는 중
                        if (returnData.data[i].PC !== "") avg_pc += parseInt(returnData.data[i].PC);
                        if (returnData.data[i].trans !== "") avg_trans += parseInt(returnData.data[i].trans);
                        if (returnData.data[i].taste !== "") avg_taste += parseInt(returnData.data[i].taste);
                        if (returnData.data[i].PXdis !== "") avg_PXdis += parseInt(returnData.data[i].PXdis);
                        if (returnData.data[i].health !== "") avg_health += parseInt(returnData.data[i].health);
                        
                    }

                    avg_old /= returnData.data.length;
                    //avg_vac /= returnData.data.length;
                    avg_pc /= returnData.data.length;
                    avg_trans /= returnData.data.length;
                    avg_taste /= returnData.data.length;
                    avg_PXdis /= returnData.data.length;
                    avg_health /= returnData.data.length;

                    cnt_bed = cnt_bed/returnData.data.length > 0.5 ? '침대' : '침상'
                    cnt_tenis = cnt_tenis/returnData.data.length > 0.5 ? '있음' : '없음'
                    cnt_soil = cnt_soil/returnData.data.length > 0.5 ? '있음' : '없음'
                    cnt_grass = cnt_grass/returnData.data.length > 0.5 ? '있음' : '없음'
                    cnt_futsal = cnt_futsal/returnData.data.length > 0.5 ? '있음' : '없음'

                    setpost({
                        ...post,
                        "old":avg_old,
                        "vaca":avg_vac,
                        "PC":avg_pc,
                        "trans":avg_trans,
                        "taste":avg_taste,
                        "PXdis":avg_PXdis,
                        "health":avg_health,
                        "bed":cnt_bed,
                        "tenis":cnt_tenis,
                        "soil":cnt_soil,
                        "grass":cnt_grass,
                        "futsal":cnt_futsal,
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
            {makeAvg("막사 노후도:",old)}
            {makeAvg("휴가: ",vaca)}
            {makeAvg("헬스장: ",health)}
            {makeAvg("주변 PC방: ",PC)}
            {makeAvg("교통: ",trans)}
            {makeAvg("밥: ",taste)}
            {makeAvg("PX: ",PXdis)}
            {makeAvg("풋살장: ",futsal)}
            {makeAvg("테니스장: ",tenis)}
            {makeAvg("잔디 운동장: ",grass)}
            {makeAvg("흙 운동장: ",soil)}
            {makeAvg("침대/침상: ",bed)}
            <button onClick = {handleLoadAll}>불러오기</button>
        </div>
        
    )

}

export default Average;