import Task from "./Task"
import {Droppable} from 'react-beautiful-dnd';
function Column(props){
    //console.log(props.tasks)
    return(
        <div className="columnHolder">
            <h2>{props.column.title}</h2>
            <Droppable droppableId={props.column.id}>
                {(provided,snapshot)=>(
                <div className={snapshot.isDraggingOver?"taskList dragCol":"taskList"}
                    ref={provided.innerRef}
                    data-draggingover={snapshot.isDraggingOver}
                    {...provided.droppableProps}>
                    {props.tasks.map((task,i)=>(
                        <Task key={task.id} 
                            taskList={task}
                            index={i}/>
                    ))}
                {provided.placeholder}
                </div>
                )}
            </Droppable>
        </div>
    )
}
export default Column