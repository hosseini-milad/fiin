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
const cookies = new Cookies();

const Steps = (props)=>{
    const [users,setUsers] = useState()
    const [index,setIndex] = useState(0)
    const [error,setError] = useState({message:'',color:"brown"})

    useEffect(()=>{
        window.scroll(0,150)
    },[index])
    const token=cookies.get('fiin-login')
    return(
        <div className="container">
        <Breadcrumb title={"Lista de Clientes"}/>

        <div className="step-fiin">
           <StepTab index={index}/>
        </div>
        <div className="step-placeHolder">
            <div className="form-fiin form-box-style">
                {index===0?<ClientMoreData userId={token.userId}/>:<></>}
                {index===1?<ClientMontage/>:<></>}
                {index===2?<SelectPlan/>:<></>}
            </div>
            <div className="footer-form-fiin rev">
                <button type="input" className="btn-fiin"
                onClick={()=>{setIndex(index+1)}}>
                    Next</button>
                <button type="input" className={index?"btn-fiin":"deact-fiin"}
                onClick={()=>{setIndex(index?index-1:0)}}>
                    Prev</button>
            </div>
        <small className="errorSmall" style={{color:error.color}}>
            {error.message}</small>
        </div>
    </div>
    )
}
export default Steps