import { useEffect ,useState} from "react"
import Breadcrumb from "../../components/BreadCrumb"
import WaitingBtn from "../../components/Button/waitingBtn"
import Cookies from 'universal-cookie';
import env from "../../env";
import PlanView from "../Forms/PlanView"
const cookies = new Cookies();

function ClientPlan(){
    const [plans,setPlans] = useState([])
    const [acceptTask,setAcceptTask] = useState()
    useEffect(()=>{
        const token=cookies.get('fiin-login')
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({})
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
            body:JSON.stringify({state:"property",tag:"",
        taskId:acceptTask})
          }
        console.log(postOptions)
        fetch(env.siteApi + "/task/confirm-proposal",postOptions)
        .then(res => res.json())
        .then(
          (result) => {
              console.log(result)
                          
          },
          (error) => {
              console.log(error)
          })
    }
    //console.log(acceptTask)
    return(
        <div className="container">
            <Breadcrumb title={"Lista de Créditos"}/>

                <div className="section-fiin">
                    <div className="section-head">
                        <h1 className="section-title">Lista de Options</h1>
                        <p className="hidden">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt .</p>
                    </div>   
                    <div className="accordions">
                    <form>
                    <fieldset id="group1">
                        {plans&&plans.map((plan,i)=>(<div className="planOption" key={i}>
                            <input type="radio" value={plan._id} className="radioPlan" 
                                name="group1" onChange={(e)=>setAcceptTask(e.target.value)}/>
                            <PlanView data={plan} /></div>
                    ))}</fieldset>
                    </form></div>
                </div>
                {plans.length?<WaitingBtn class="btn-fiin acceptBtn" title="Confirm Proposal" 
                        waiting={'Confirm Proposal'}
                    function={confirmProposal} name="submit" />:<></>}
        </div>
    )
}
export default ClientPlan