import { useEffect } from "react"
import Breadcrumb from "../../components/BreadCrumb"
import Register from "../Register"

function RegisterPartner(){
    useEffect(()=>{
    const token=cookies.get('fiin-login')
        const postOptions={
            method:'get',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId}
          }
          //console.log(postOptions)
        fetch(env.siteApi + "/auth/partner",postOptions)
      .then(res => res.json())
      .then(
        (result) => {
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
    },[])
    return(
        <div className="container">
        <Breadcrumb title={"Registo de Partner"}/>

        <div className="section-fiin registo-de-cliente">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <Register access={"partner"}  title="partner"/>
                </div>
            </div>
        </div>
    </div>
    )
}
export default RegisterPartner