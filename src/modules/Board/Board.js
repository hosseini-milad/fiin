import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';
const initalData = {
        tasks:{
            'task-1':{id:'task-1',content:"1.User Register"},
            'task-2':{id:'task-2',content:"2.User Confirm"},
            'task-3':{id:'task-3',content:"3.User Active"},
            'task-4':{id:'task-4',content:"4.Data Uploaded"},
            'task-5':{id:'task-5',content:"5.Sent to Bank"},
            'task-6':{id:'task-6',content:"6.Recieve Bank Acount"}
        },
        columns:{
            'column-1':{
                id:"column-1", title:"To Do",
                taskIds:['task-1','task-2','task-3','task-4']
            },
            'column-2':{
                id:"column-2", title:"InProgress",
                taskIds:[]
            },
            'column-3':{
                id:"column-3", title:"Published",
                taskIds:['task-5','task-6']
            }
        },
        columnOrder:['column-1','column-2','column-3']
    }

function Board(){
    const [boardArray,setBoardArray] = useState(initalData)
    
    const DragEnd=(result)=>{
        document.body.style.color="inherit"
        document.body.style.backgroundColor="inherit"
        const {destination,source,draggableId} = result
        if(!destination){
            return
        }
        if(destination.droppableId===source.droppableId&&
            destination.index === source.index)
            return;
        const start = boardArray.columns[source.droppableId]
        const finish = boardArray.columns[destination.droppableId]
        if(start === finish){
            const newTaskIds=Array.from(start.taskIds)
            newTaskIds.splice(source.index,1);
            newTaskIds.splice(destination.index,0,draggableId);

            const newColumn = {
                ...start, taskIds:newTaskIds,
            }

            const newBoard = {
                ...boardArray,
                columns:{
                    ...boardArray.columns,
                    [newColumn.id]:newColumn
                }
            }
            setBoardArray(newBoard)
            return;
        }
        else{
            const startTaskIds=Array.from(start.taskIds)
            startTaskIds.splice(source.index,1);

            const newStart = {
                ...start, taskIds:startTaskIds,
            }
            const finishTaskIds=Array.from(finish.taskIds)
            finishTaskIds.splice(destination.index,0,draggableId);

            const newFinish = {
                ...finish, taskIds:finishTaskIds,
            }

            const newBoard = {
                ...boardArray,
                columns:{
                    ...boardArray.columns,
                    [newStart.id]:newStart,
                    [newFinish.id]:newFinish
                }
            }
            setBoardArray(newBoard)
            return;
        }
    }
    const DragStart=(result)=>{
        document.body.style.color="var(--blue)";
        document.body.style.transition='background-color 0.2s ease'
    }
    const DragUpdate=(update)=>{
        /*const {destination} = update;
        const opacity = destination?
            destination.index/Object.keys(boardArray.tasks).length:0
        document.body.style.backgroundColor=`rgba(153,141,217,${opacity})`*/
    }
    return(
        <div className='toDoHolder'>
            <DragDropContext
            onDragStart={DragStart}
            onDragUpdate={DragUpdate}
            onDragEnd={DragEnd}>
                {boardArray.columnOrder.map((columnId)=>{
                    const column = boardArray.columns[columnId];
                    const tasks = column.taskIds.map(taskId=>boardArray.tasks[taskId]);
                    return(<Column key={column.id} column={column} tasks={tasks}/>)
                })}
            </DragDropContext>
        </div>
    )
}
export default Board