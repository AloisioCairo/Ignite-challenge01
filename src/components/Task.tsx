import { Clipboard, PlusCircle } from 'phosphor-react';
import { FormEvent, InvalidEvent, useState } from 'react';

import { ItemTak } from './ItemTask';

import styles from './Task.module.css';

// const itensTask = [
//     {
//         id: '1',
//         description: 'Primeira descrição ...'
//     },
//     {
//         id: '2',
//         description: 'Segunda descrição ...'
//     },
//     {
//         id: '3',
//         description: 'Terceira descrição ...'
//     },
//     {
//         id: '4',
//         description: 'Quarta descrição ...'
//     }
// ];

interface Task {
    id: number;
    description: string;
    isComplete: boolean;
}

export function Task(){
    const [tasks, setTasks] = useState<Task[]>([]);

    const [newDescriptionTask, setDescriptionNewTask] = useState('');

    const [taskIsCompleted, setTaskIsCompleted] = useState(0);

    function handleCreateNewTask(event: FormEvent) {

        event?.preventDefault();

        const newTask = {
            id: Math.random(),
            description: newDescriptionTask,
            isComplete: false,
        }
    
        setTasks([... tasks, newTask]);
        setDescriptionNewTask('');
    }

    function handleNewCommentChange(event: InvalidEvent<HTMLTextAreaElement>) {
        event?.target.setCustomValidity('');
        setDescriptionNewTask(event.target.value);
    }

    function handleNewCommentInvalid(){
        event?.target.setCustomValidity('Esse campo é obrigatório.');
    }

    function deleteTask(id: number) {        
        const taskWithoutDeleteOne = tasks.filter(task => task.id != id);

        setTasks(taskWithoutDeleteOne);
    }

    function situationTask(id: number) {
        const newTask = tasks.map(task => task.id === id ? {
            ... task,
            isComplete: !task.isComplete        
        }: task);

        (tasks.map(taskSituation => {
            if (taskSituation.isComplete)
                setTaskIsCompleted(taskIsCompleted - 1);
            else
                setTaskIsCompleted(taskIsCompleted + 1);
        }));

        setTasks(newTask);
    }

    return (
        <div>
            <form onSubmit={handleCreateNewTask}>
                <div className={styles.newTask}>
                    <input
                        name="task"
                        type="text"
                        placeholder="Adicione uma nova tarefa"
                        value={newDescriptionTask}
                        onChange={handleNewCommentChange}
                        onInvalid={handleNewCommentInvalid}
                        className={styles.input}
                        required
                    />

                    <form onClick={handleCreateNewTask}>
                        <a href="#">Criar<PlusCircle size={20} /></a>
                    </form>
                </div>
            </form>

            <div className={styles.task}>
                <div className={styles.info}>
                    <span className={styles.infoCreated}>Tarefas criadas <span>{tasks.length}</span></span>
                    <span className={styles.infoDone}>Concluídas <span>{taskIsCompleted} de {tasks.length}</span></span>
                </div>
                
                {(() => {
                    if (tasks.length == 0){
                        return (
                            <div className={styles.area}>
                                <Clipboard size={70} className={styles.svgClipboard}/>
                                <span className={styles.text}>Você ainda não tem tarefas cadastradas</span>
                                <span>Crie tarefas e organize seus itens a fazer</span>
                            </div> 
                        )
                    }
                    
                    return (
                        <div className={styles.area}>
                            { tasks.map(task => {
                                    return (
                                        <ItemTak 
                                            key={task.id}
                                            id={task.id}
                                            description={task.description}
                                            isComplete={task.isComplete}
                                            onDeleteTask={deleteTask}
                                            onSituationTask={situationTask}
                                        />
                                    )
                                })
                            }
                        </div>
                    );
                    })()}
            </div>
        </div>
    );
    
    
}