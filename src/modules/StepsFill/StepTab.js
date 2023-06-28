function StepTab(props){
    const index = props.index;
    const classSet=(indx)=>{
        return(
            index===indx?"tabStep tabStepActive":
                index<indx?"tabStep tabStepDeactive":"tabStep"
        )
    }
    return(
        <div className="tabStepHolder">
            <div className={classSet(0)}>
                <i className="icon-user"></i>
                <span>Fill Data</span>
            </div>
            <div className={classSet(1)}>
                <i className="icon-user"></i>
                <span>Fill Mortage</span>
            </div>
            <div className={classSet(2)}>
                <i className="icon-user"></i>
                <span>Select Plan</span>
            </div>
            <div className={classSet(3)}>
                <i className="icon-user"></i>
                <span>Accept Term</span>
            </div>
        </div>
    )
}
export default StepTab