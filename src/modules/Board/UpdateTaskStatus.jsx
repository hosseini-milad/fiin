import env from "../../env"

function UpdateTaskStatus(props){
    const allTasks = props.allTasks
    const leadTask = props.leadTask
    const informationTask = props.informationTask
    const fiinTask = props.fiinTask
    const tasks=
        allTasks.map((task,i)=>(
            `"${task._id}":{"id":"${task._id}",
            "content":{"user":"${task.userDetail[0].cName} ${task.userDetail[0].sName}",
            "phone":"${task.userDetail[0].phone}",
            "email":"${task.userDetail[0].email}",
            "id":"${task.userId}"}}`
        ))
    return(
        {
            tasks:JSON.parse(`{${tasks}}`),
            columns:{
                'lead':{
                    id:"lead", title:"Lead",
                    taskIds:leadTask.map(lead=>lead._id)
                },
                'informations':{
                    id:"informations", title:"Informações",
                    taskIds:informationTask.map(lead=>lead._id)
                },
                'fiin':{
                    id:"fiin", title:"FINE's",
                    taskIds:fiinTask.map(lead=>lead._id)
                }
            },
            columnOrder:env.columnOrder
        }
    )
}
export default UpdateTaskStatus