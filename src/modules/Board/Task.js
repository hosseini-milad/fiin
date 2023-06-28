import {Draggable} from 'react-beautiful-dnd'
import { dayFromNow } from '../../env'
function Task(props){
    return(<Draggable key={props.taskList.id}
        draggableId ={props.taskList.id} index={props.index}>
            {(provided,snapshot)=>(
                <li className={snapshot.isDragging?"board-task dragTask":"board-task"}
                    {...provided.draggableProps}
                    ref={provided.innerRef} 
                    data-dragging={snapshot.isDragging}>
                        
                    <a href={`/profile/${props.taskList.content.id}`}>
                        <h3 className="task-title">{props.taskList.content.user}</h3></a>
                    <span className="task-date">{dayFromNow(props.taskList.content.date)}</span>
                    <ul className="task-meta">
                        <li><a href={`mailto:${props.taskList.content.email}`}>
                            <span className="icon-envelope"></span> 
                            {props.taskList.content.email}</a></li>
                        <li><a href={`tel:${props.taskList.content.phone}`}>
                            <span className="icon-phone"></span>
                            {props.taskList.content.phone}</a></li>
                    </ul>
                    <span className={props.taskList.content.status==="active"?
                        "task-status status-active":"task-status status-deactive"}>
                            {props.taskList.content.status}</span>
                    <div className='task-handler' 
                            {...provided.dragHandleProps}  ></div>
                    
                </li>
            )}
        
    </Draggable>)
}
export default Task