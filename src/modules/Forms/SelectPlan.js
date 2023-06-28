import { useEffect, useState } from "react"
import env from "../../env"
import Cookies from 'universal-cookie';
import WaitingBtn from "../../components/Button/waitingBtn";
const cookies = new Cookies();


function SelectPlan(props){

    const [error,setError] = useState({message:'',color:"brown"})
    
    return(<>
        <div className="row">
            <div className="col-md-12">
                <label htmlFor="Vencimento">Option1</label>
                <input type="radio" name="size" value="option1" id="xl"/>
            </div>
            <div className="col-md-12">
                <label htmlFor="Vencimento">Option2</label>
                <input type="radio" name="size" value="option1" id="xl"/>
            </div>
            <div className="col-md-12">
                <label htmlFor="Vencimento">Option3</label>
                <input type="radio" name="size" value="option1" id="xl"/>
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
export default SelectPlan