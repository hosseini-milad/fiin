import Breadcrumb from "../../components/BreadCrumb"
import Register from "../Register"

const RegAgency = (props)=>{
    return(
        <div className="container">
        <Breadcrumb title={"Registo de agency"}/>

        <div className="section-fiin registo-de-consultores">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <Register access={"agency"} showpass="true" title="agência"/>
                </div>
            </div>
        </div>
    </div>
    )
}
export default RegAgency