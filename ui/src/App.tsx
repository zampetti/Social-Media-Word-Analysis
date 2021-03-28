import React from 'react';
import styles from './App.scss';
import Issue from './components/issue'
import Counter from './components/Counter'

type AppProps = { title: string };
 
const App = ({ title }: AppProps) => (
  <div>
    <div className={styles.header}><p>Social Media Issue Analyzer</p></div>
    <div className={styles.body}>
      <h3>{title}</h3>
      <Counter />
      <div className={styles.issues}>
        <Issue issue={"immigration"} />
        <Issue issue={"#BlackLivesMatter"} />
        <Issue issue={"climage change"} />
        <Issue issue={"immigration"} />
        <Issue issue={"#BlackLivesMatter"} />
        <Issue issue={"climage change"} />
      </div>
    </div>
    <div className={styles.footer}></div>
  </div>
)
 
export default App;
