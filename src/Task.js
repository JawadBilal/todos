
import deleteIcon from '../src/images/delete1.svg';
import editIcon from './images/edit1.svg';


export const Task = (props) => {
    return(
        <div className={`taskList ${props.completed ? 'done' : ''}`}>
            <div onClick={()=>props.doneTask(props.id)} className={props.completed ? 'doneTask' : ''}>
                 {props.taskName} </div>
            <div className="functionBtn">
                <button disabled={props.completed ? true:false} onClick={()=>props.editItem(props.id)}><img src={editIcon} alt='edit button' className={props.completed ? "":"editIcon"} /></button>
                <button onClick={() => props.deleteTask(props.id)}><img src={deleteIcon} alt="close button" className="deletebtn"/></button>
            </div>
            
        </div>
    );
};