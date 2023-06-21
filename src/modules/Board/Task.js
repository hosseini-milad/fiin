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
                    {props.taskList.content}
                </div>
            )}
        
    </Draggable>)
}
export default Task