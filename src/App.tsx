import './global.css';
import styles from './App.module.css';

import { Header } from './components/Header';
import { Task } from './components/Task';

function App() {
  return (
    <div>
      <Header/>
      <div className={styles.content}>
        <Task/>
      </div>
    </div>
  )
}

export default App
