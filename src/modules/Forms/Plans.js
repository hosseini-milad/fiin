import { useEffect ,useState} from "react"
import Breadcrumb from "../../components/BreadCrumb"
import WaitingBtn from "../../components/Button/waitingBtn"
import PlanItem from "./PlanItem"
import PlanView from "./PlanView"
import Cookies from 'universal-cookie';
import env from "../../env";
const cookies = new Cookies();

function Plans(){
    const userId = document.location.pathname.split('/')[3]
    const [plans,setPlans] = useState()
    useEffect(()=>{
        const token=cookies.get('fiin-login')
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify(
                {userId:userId})
          }
          //console.log(postOptions)
        fetch(env.siteApi + "/form/user-plans",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            setPlans(result.plans)
                        
        },
        (error) => {
            console.log(error)
        })
    },[])
    const confirmProposal=()=>{
        
        const token=cookies.get('fiin-login')
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify(
                {userId:userId,tag:"proposal"})
          }
          //console.log(postOptions)
        fetch(env.siteApi + "/task/changeTask",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            console.log(result)
            setTimeout(()=>document.location.href="/dashboard",1000)       
        },
        (error) => {
            console.log(error)
        })
    }
    return(
        <div className="container">
            <Breadcrumb title={"Lista de Créditos"}/>

                <div className="section-fiin">
                    <div className="section-head">
                        <h1 className="section-title">Lista de Options</h1>
                        <p className="hidden">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt .</p>
                    </div>   
                    <PlanItem userId={userId}/>
                    <div className="accordions">
                        {plans&&plans.map((plan,i)=>(
                            <PlanView data={plan} key={i} />
                    ))}</div>
                </div>
                {plans?<WaitingBtn class="btn-fiin acceptBtn" title="Confirm Proposal" 
                        waiting={'Confirm Proposal'}
                    function={confirmProposal} name="submit" />:<></>}
        </div>
    )
}
export default Plans