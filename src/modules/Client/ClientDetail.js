
import Breadcrumb from "../../components/BreadCrumb";
import ClientMoreData from "../Forms/ClientMoreData";
function ClientDetail(props){

    return(
    <div className="container">
        <Breadcrumb title={"Update User Data"}/>

        <div className="section-fiin registo-de-cliente">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                <div className="form-fiin form-box-style">
                    
                    <ClientMoreData />
                    
                </div>
                </div>
            </div>
        </div>
    </div>

        
    )
}
export default ClientDetail