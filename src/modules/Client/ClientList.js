import { useEffect, useState } from "react"
import Breadcrumb from "../../components/BreadCrumb"
import ListFilters from "../ListFilters"
import env from "../../env"
import Cookies from 'universal-cookie';
import ClientListTable from "./ClientListTable"
import FilterBitrix from "../filtersBitrix";
const cookies = new Cookies();

const ClientList = (props)=>{
    const [users,setUsers] = useState()
    const [filter,setFilter] = useState()
    const [doFilter,setDoFilter] = useState(1)
    const [pageNumber,setPageNumber] = useState(0)
    
    const token=cookies.get('fiin-login')
    useEffect(()=>{
        
        setUsers('')
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({access:"customer",...filter,
            pageSize:5,offset:pageNumber})
          }
        fetch(env.siteApi + "/auth/list-search",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                setUsers(result)
                /*if(result.error){
                    setError({message:result.error,color:"brown"})
                    setTimeout(()=>setError({message:'',color:"brown"}),3000)
                }
                else{
                    setError({message:result.message,color:"green"})
                    setTimeout(()=>window.location.reload(),1000)
                }*/
                
            },
            (error) => {
                console.log(error)
            })
    },[])
    useEffect(()=>{
        if(!doFilter)return
        setPageNumber(0)
        setDoFilter(0)
    },[doFilter])
    useEffect(()=>{
        
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({access:"customer",...filter,
            pageSize:5,offset:pageNumber})
          }
        fetch(env.siteApi + "/auth/list-search",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                setUsers(result)
                
            },
            (error) => {
                console.log(error)
            })
            window.scrollTo(0,500)
    },[pageNumber,doFilter])
    return(
        <div className="container">
        <Breadcrumb title={"Lista de Clientes"}/>

        <div className="section-fiin">
            {/*<ListFilters setDoFilter={setDoFilter} filter={filter} setFilter={setFilter}/>    */}
            <FilterBitrix  setDoFilter={setDoFilter} filter={filter} setFilter={setFilter}/> 
        </div>
        <div className="section-fiin">
            <div className="section-head">
                <h1 className="section-title">Lista de Clientes</h1>
                <p className="hidden">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt .</p>
            </div>   
            <div className="table-fiin">
                <ClientListTable users={users} pageNumber={pageNumber} access={token&&token.level}
                    setPageNumber={setPageNumber} setDoFilter={setDoFilter}/>
            </div>
        </div>
    </div>
    )
}
export default ClientList