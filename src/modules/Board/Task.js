import {Draggable} from 'react-beautiful-dnd'
function Task(props){
    return(<Draggable key={props.taskList.id}
        draggableId ={props.taskList.id} index={props.index}>
            {(provided,snapshot)=>(
                <div className={snapshot.isDragging?"taskPlace dragTask":"taskPlace"}
                    {...provided.draggableProps}
                    ref={provided.innerRef} 
                    data-dragging={snapshot.isDragging}>
                        <div className='handler' 
                            {...provided.dragHandleProps}  ></div>
                    <span>{props.taskList.content.user}
                    <a href={`tel:${props.taskList.content.phone}`}>
                        <span className="icon-phone"></span></a>
                    <a href={`mail:${props.taskList.content.email}`}>
                        <span className="icon-phone"></span></a>
                    <a href={`/profile/${props.taskList.content.id}`}>
                        <span className="icon-phone"></span></a>
                    
                    </span>
                    
                </div>
            )}
        
    </Draggable>)
}
export default Task