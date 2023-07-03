import { useEffect, useState } from "react"
import Breadcrumb from "../../components/BreadCrumb"
import ListFilters from "../ListFilters"
import env from "../../env"
import Cookies from 'universal-cookie';
import StepTab from "./StepTab";
import ClientDetail from "../Client/ClientDetail";
import ClientMoreData from "../Forms/ClientMoreData";
import ClientMontage from "../Forms/ClientMontage";
import SelectPlan from "../Forms/SelectPlan";
import WaitingBtn from "../../components/Button/waitingBtn";
const cookies = new Cookies();

const Steps = (props)=>{
    const urlTab = window.location.href;
    const urlLocation = urlTab.includes('#')?urlTab.split('#')[1]:''
    //const [urlLocation,setUrlLocation] = useState()
    const [index,setIndex] = useState(0)
    const [error,setError] = useState({message:'',color:"brown"})
    
    useEffect(()=>{
        //setUrlLocation(urlTab.includes('#')?urlTab.split('#')[1]:'')
        urlLocation==="data"&&setIndex(0)
        urlLocation==="mortage"&&setIndex(1)
        urlLocation==="plan"&&setIndex(2)
    },[urlLocation])
    const updateTab=(indx)=>{
        if(indx===0)document.location.href="/client/steps#data"
        if(indx===1)document.location.href="/client/steps#mortage"
        if(indx===2)document.location.href="/client/steps#plan"

    }
    useEffect(()=>{
        window.scroll(0,150)
    },[index])
    const ConfirmData=()=>{
        const token=cookies.get('fiin-login')
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({state:"fiin", oldState:"informations"})
          }
        fetch(env.siteApi + "/form/confirm-user-data",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            if(result.error){
                setError({message:result.error,color:"brown"})
            setTimeout(()=>setError({message:'',color:"brown"}),3000)
            }
            else{
                setError({message:result.message,color:"green"})
                setTimeout(()=>document.location.href="/dashboard",1000)
            }
        },
        (error) => {
            setError({message:"error",color:"brown"})
            setTimeout(()=>setError({message:'',color:"brown"}),3000)
        })
        
    }
    const token=cookies.get('fiin-login')
    return(
        <div className="container">
        <Breadcrumb title={"Lista de Clientes"}/>

        <div className="step-fiin">
           <StepTab index={index} setIndex={setIndex}/>
        </div>
        <div className="step-placeHolder">
            <div className="form-fiin form-box-style">
                {index===0?<ClientMoreData userId={token.userId}/>:<></>}
                {index===1?<ClientMontage userId={token.userId}/>:<></>}
                {index===2?<SelectPlan/>:<></>}
            </div>
            <div className="footer-form-fiin rev">
                {index===1?<></>:<button type="input" className="btn-fiin"
                onClick={()=>{setIndex(index+1);updateTab(index+1)}}>
                    Next</button>}
                
                {index===1?
                    <WaitingBtn class="btn-fiin acceptBtn rev" title="Confirm" 
                        waiting={'Confirming.'}
                        function={ConfirmData} name="submit" error={error}/> 
                :<></>}
                <button type="input" className={index?"btn-fiin":"deact-fiin"}
                onClick={()=>{setIndex(index?index-1:0);updateTab(index?index-1:0)}}>
                    Prev</button>
            </div>
        <small className="errorSmall" style={{color:error.color}}>
            {error.message}</small>
        </div>
    </div>
    )
}
export default Steps