import { useEffect, useState } from "react"
import env from "../../env"
import Cookies from 'universal-cookie';
import WaitingBtn from "../../components/Button/waitingBtn";
const cookies = new Cookies();


function ClientMontage(props){
    const userId = props.userId?props.userId:document.location.pathname.split('/')[3]
    const [userData,setUserData] = useState()
    const [regElement,setRegElement] = useState()
    const [error,setError] = useState({message:'',color:"brown"})
    
    return(<>
        <div className="row">
            <div className="col-md-6">
                <div className="form-field-fiin">
                    <label htmlFor="Vencimento">Vencimento<sup>*</sup></label>
                    <input type="text" name="Vencimento" id="Vencimento" placeholder="Vencimento" required
                    defaultValue={props.regElement&&props.regElement.vencimento}
                    onChange={(e)=>props.setRegElement(data => ({
                        ...data,
                        ...{vencimento:e.target.value}
                    }))}/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-field-fiin">
                    <label htmlFor="recibos">Recibos Verdes<sup>*</sup></label>
                    <input type="text" name="recibos" id="recibos" placeholder="Recibos Verdes" required
                    defaultValue={props.regElement&&props.regElement.recibos}
                    onChange={(e)=>props.setRegElement(data => ({
                        ...data,
                        ...{recibos:e.target.value}
                    }))}/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-field-fiin">
                    <label htmlFor="rendas">Rendas<sup>*</sup></label>
                    <input type="text" name="rendas" id="rendas" placeholder="Rendas" required
                    defaultValue={props.regElement&&props.regElement.rendas}
                    onChange={(e)=>props.setRegElement(data => ({
                        ...data,
                        ...{rendas:e.target.value}
                    }))}/>
                </div>
            </div>
            
        </div>
        <div className="footer-form-fiin">
            <WaitingBtn class="btn-fiin" title="Update" 
                waiting={'Updating.'}
                function={()=>{}} name="submit" error={error}/> 
        </div>
        <small className="errorSmall" style={{color:error.color}}>
            {error.message}</small>
        </>
    )
}
export default ClientMontage