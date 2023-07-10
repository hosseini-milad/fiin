import { useState } from "react"
import WaitingBtn from "../../components/Button/waitingBtn"
import InlineUpload from "./InlineUpload"
import Cookies from 'universal-cookie';
import env from "../../env";
const cookies = new Cookies();

function PlanView(props){
    console.log(props.data)
    return(
            <div className="accordion-item" 
                style={{backgroundColor:props.data.selectedPlan==="true"?"lightGreen":"inherit"}}>
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
                    <a href={env.siteApiUrl+props.data.fileUrl} className="">
                        <span className="icon-upload"></span></a>
                    </div>
                    
                </div>
            </div>
    )
}
export default PlanView