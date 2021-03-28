import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import styles from './issue.scss';
import { sagaActions } from '../redux/sagaActions'
import { selectFetch } from './issueSlice'

type IssueProps = { issue: string };
 
const Issue = ({issue}: IssueProps) => {
    const data = useSelector(selectFetch);
    const dispatch = useDispatch();

    console.log("DATA IN COMPONENT: ", data);
    
    return (
        <div className={styles.body}>
            <h4>{issue}</h4>
            <button onClick={() => {
                    console.log("BUTTON CLICKED")
                    dispatch({ type: sagaActions.FETCH_DATA_SAGA })
                }}>
                Getdata
            </button>
        </div>
    )
}
 
export default Issue;
