import Breadcrumb from "../../components/BreadCrumb"
import Register from "../Register"

const RegClient = (props)=>{
    return(
        <div className="container">
        <Breadcrumb title={"Registo de cliente"}/>

        <div className="section-fiin registo-de-cliente">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <Register access={"customer"}  title="cliente"/>
                </div>
            </div>
        </div>
    </div>
    )
}
export default RegClient