import Board from "../modules/Board/Board"

function Dashboard(){
    return(
        <main className="container-fluid">
            <div className="boards">
                <Board />
            </div>
        </main>
    )
}
export default Dashboard