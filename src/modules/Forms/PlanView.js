import { useState } from "react"
import WaitingBtn from "../../components/Button/waitingBtn"
import InlineUpload from "./InlineUpload"
import Cookies from 'universal-cookie';
import env from "../../env";
const cookies = new Cookies();

function PlanView(props){
    const [upFile,setUpFile] = useState()
    const [planParam,setPlanParam] = useState()
    const [error,setError] = useState({message:'',color:"brown"})

    const addProposal=()=>{
        const token=cookies.get('fiin-login')
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify(
                {planId:props.userId})
          }
          //console.log(postOptions)
        fetch(env.siteApi + "/form/delete-user-plan",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
            console.log(result)
            if(result.error){
                setError({message:result.error,color:"brown"})
                setTimeout(()=>setError({message:'',color:"brown"}),3000)
            }
            else{
                setError({message:result.message,color:"green"})
                //setTimeout(()=>window.location.reload(),1000)
            }
            
        },
        (error) => {
            console.log(error)
        })
    }
    return(
            <div className="accordion-item">
                <div className={"accordion-title"}
                        data-tab="item1">
                    <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 align-items-center">
                        <div className="col">
                            <div className="list-item">
                                <span>Proposal Name: </span>
                                {props.data.planName}
                            </div>
                        </div>
                        <div className="col">
                            <div className="list-item">
                                <span>Bank Name: </span>
                                {props.data.bankName}
                            </div>
                        </div>
                        <div className="col">
                            <div className="list-item">
                                <span>Proposal Description: </span>
                                {props.data.planDescription}
                            </div>
                        </div>
                    </div>
                    <div className="show-more list-item reyhamUpload">
                    <a href={props.data.fileUrl} className="">
                        <span className="icon-upload"></span></a>
                    </div>
                    
                </div>
            </div>
    )
}
export default PlanView