import React,{useState,useEffect} from 'react';

import axios from 'axios';
import "./star.css"

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
        

    });

    const [count_res,setcount] = useState(0)
    
    let [avg_old,avg_vac,avg_pc,avg_trans,avg_taste,avg_PXdis,avg_health] = [0,0,0,0,0,0,0,0];
    let [cnt_old,cnt_vac,cnt_pc,cnt_trans,cnt_taste,cnt_PXdis,cnt_health] = [0,0,0,0,0,0,0,0];
    let [cnt_bed,cnt_soil,cnt_grass,cnt_futsal,cnt_tenis,cnt_basket] = [0,0,0,0,0,0];
    const {old,bed,soil,grass,futsal,basket,tenis,vaca,health,PC,trans,taste,PXdis,etc} = post;

    useEffect(()=> {
        handleLoadAll();
    },[]);




    const makeAvg = (name,value) => {
        if(value===""){
            return;
        }else{
        return (
            <div id = "out">
                {name}
                {value}
            </div>
        )
        }
    }

    const makeAvgStar = (name,value) => {
        return (
                <inline>
                    {name}   <span class = "value">{value}</span>
                    <div id="outer">
                        <span id="overlay" style={{width:(100-value/3*100)+"%"}}></span>
                        <span id="inner"></span>
                       
                    </div>
                    
                </inline>
            
        )
    }

    const handleLoadAll = () => {
        axios
            .post("http://192.249.18.153:80/user/loadAll")
            .then(returnData=>{
                setcount(returnData.data.length
                );
                console.log(`조사에 응한 사람 수: ${count_res}`)
                console.log(returnData)
                if(returnData.status === 200){
                    for(let i =0; i<returnData.data.length; i++){
                        if (returnData.data[i].bed === "bed") cnt_bed++;
                        if (returnData.data[i].grass !== "") cnt_grass++;
                        if (returnData.data[i].soil !== "") cnt_soil++;
                        if (returnData.data[i].futsal !== "") cnt_futsal++;
                        if (returnData.data[i].tenis !== "") cnt_tenis++;
                        if (returnData.data[i].basket !== "") cnt_basket++;

                        if (returnData.data[i].old !== ""){
                            avg_old += parseInt(returnData.data[i].old);
                            cnt_old++;
                        } 
                        if (returnData.data[i].vaca !== ""){
                            avg_vac += parseInt(returnData.data[i].vaca);
                            cnt_vac++;
                        } 
                        //vac data가 없어서 오류나는 중
                        if (returnData.data[i].PC !== ""){
                            avg_pc += parseInt(returnData.data[i].PC);
                            cnt_pc++;
                        } 
                        if (returnData.data[i].trans !== ""){
                            avg_trans += parseInt(returnData.data[i].trans);
                            cnt_trans++;
                        }
                        if (returnData.data[i].taste !== ""){
                            avg_taste += parseInt(returnData.data[i].taste);
                            cnt_taste++;
                        }
                        if (returnData.data[i].PXdis !== ""){
                            avg_PXdis += parseInt(returnData.data[i].PXdis);
                            cnt_PXdis++;
                        }
                        if (returnData.data[i].health !== ""){
                            avg_health += parseInt(returnData.data[i].health);
                            cnt_health++;
                        }
                        
                    }

                    avg_old /= cnt_old;
                    avg_vac /= cnt_vac;
                    avg_pc /= cnt_pc;
                    avg_trans /= cnt_trans;
                    avg_taste /= cnt_taste;
                    avg_PXdis /= cnt_PXdis;
                    avg_health /= cnt_health;
                    console.log(avg_old)

                    cnt_bed = cnt_bed/returnData.data.length > 0.5 ? '침대' : '침상'
                    cnt_tenis = cnt_tenis/returnData.data.length > 0.5 ? '테니스장' : ''
                    cnt_soil = cnt_soil/returnData.data.length > 0.5 ? '흙 운동장' : ''
                    cnt_grass = cnt_grass/returnData.data.length > 0.5 ? '인조잔디구장' : ''
                    cnt_futsal = cnt_futsal/returnData.data.length > 0.5 ? '풋살장' : ''
                    cnt_basket = cnt_basket/returnData.data.length > 0.5 ? '농구장' : ''


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
                        "basket":cnt_basket
                    })
                    //alert('load');
                    
                }
            })
    }

    return (
        <div class = "form">
            <div class="result">
                <h1>8사단 정보통신대대 평가</h1>
                <p>{count_res}명이 평가에 참여했습니다.</p>
                <div class = "starrate">
                <h2>별점</h2>
                {makeAvgStar("건물",old)}
                {makeAvgStar("휴가",vaca)}
                {makeAvgStar("헬스장",health)}
                {makeAvgStar("주변 피시방",PC)}
                {makeAvgStar("교통",trans)}
                {makeAvgStar("밥",taste)}
                {makeAvgStar("PX",PXdis)}
                <h2>운영 시설</h2>
                {makeAvg("침대/침상:  ",bed)}
                {makeAvg("",futsal)}
                {makeAvg("",tenis)}
                {makeAvg("",basket)}
                {makeAvg("",grass)}
                {makeAvg("",soil)}
                </div>
            </div>
        </div>
        
    )

}

export default Average;