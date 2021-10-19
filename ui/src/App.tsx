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
        <Issue key={"immigration1"} issue={"immigration"} />
        <Issue key={"#BlackLivesMatter1"} issue={"#BlackLivesMatter"} />
        <Issue key={"climate change1"} issue={"climage change"} />
        <Issue key={"immigration2"} issue={"immigration"} />
        <Issue key={"#BlackLivesMatter2"} issue={"#BlackLivesMatter"} />
        <Issue key={"climate change2"} issue={"climage change"} />
      </div>
    </div>
    <div className={styles.footer}></div>
  </div>
)
 
export default App;

// function solution(A) {
//   // write your code in JavaScript (Node.js 8.9.4)
//   let uniqueA = [...new Set(A)]
//   let filteredA = uniqueA.filter(x => x > 0).sort((a, b) => a - b)

//   if (filteredA.length > 0) {
//       filteredA.push(filteredA[filteredA.length-1] + 2)
//   } else {
//       return 1
//   }
  
//   if (filteredA[0] > 1) {
//       return 1
//   } else {
//       for (var i=1; i<filteredA.length; i++) {
//           if (filteredA[i] - filteredA[i-1] !== 1) {
//               return (filteredA[i-1] + 1)
//           }
//       }
//   }

//   return 1
// }
