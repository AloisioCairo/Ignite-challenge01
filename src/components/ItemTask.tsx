import { Trash } from 'phosphor-react';

import styles from './ItemTask.module.css';

export function ItemTak ({ id, description, iscomplete, onDeleteTask, onSituationTask}){

    function handleDeleteTask() {
        onDeleteTask(id);
    }

    function handleSituationTask(id: number) {
        onSituationTask(id);
    }

    return(
        <div className={styles.task}>
            <input 
                type="checkbox" 
                id="" 
                name="" 
                checked={iscomplete}
                onClick={() => handleSituationTask(id)}
                >
            </input>
            
            <p>{description}</p>
            
            <button onClick={handleDeleteTask} title='Deletar task'>
                <Trash size={20}/>
            </button>
        </div>
    );
}