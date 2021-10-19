import React from 'react';
import ReactTooltip from 'react-tooltip';
import ReactWordcloud from 'react-wordcloud';
import { useDispatch, useSelector } from "react-redux";
import styles from './issue.scss';
import { sagaActions } from '../redux/sagaActions'
import { fetchData, selectFetch, selectLoad } from './issueSlice'

type IssueProps = { issue: string };
 
const Issue = ({issue}: IssueProps) => {
    const data = useSelector(selectFetch);
    const isLoading = useSelector(selectLoad)
    const dispatch = useDispatch();

    const _afterShow = () => {
        // dispatch({ type: sagaActions.FETCH_DATA_SAGA })
        dispatch(fetchData("immigration"))
    }

    const tipEvent = (issue:string) => {
        console.log("ISSUE IN COMPONENT: ", issue);
        console.log("DATA IN COMPONETN: ", data)
        return (
            <div>
                <p>{issue}</p>
                {data.WordCount ? <ReactWordcloud words={data.WordCount} /> : null}
                <div style={{display:"flex", opacity: "1"}}>
                    {data.Bigrams ? 
                        <table>
                            <thead>
                                <tr><th>Bigrams</th><th>Count</th></tr>
                            </thead>
                            <tbody>
                                {data.Bigrams.map((b:any) => {
                                    return (
                                        <tr><th>{b.Ngram}</th><th>{b.Count}</th></tr>
                                    )
                                })}
                            </tbody>
                        </table> 
                    : null}
                    {data.Trigrams ? 
                        <table>
                            <thead>
                                <tr><th>Trigrams</th><th>Count</th></tr>
                            </thead>
                            <tbody>
                                {data.Trigrams.map((b:any) => {
                                    return (
                                        <tr><th>{b.Ngram}</th><th>{b.Count}</th></tr>
                                    )
                                })}
                            </tbody>
                        </table> 
                    : null}
                </div>
            </div>
        )
    }

    console.log("IS LOADING: ", isLoading)
    
    return (
        <div className={styles.body}>
            <h4>{issue}</h4>
            <button 
                // onClick={() => {
                //     console.log("BUTTON CLICKED")
                //     // dispatch({ type: sagaActions.FETCH_DATA_SAGA })
                // }} 
                data-for="custom-class"
                data-tip="immigration"
                data-event="click">
                Getdata
            </button>
            <ReactTooltip
                id="custom-class"
                className={styles.tipEffect}
                // delayHide={1000}
                effect="solid"
                globalEventOff={"click"}
                afterShow={_afterShow}
                clickable={true}
                arrowColor="transparent"
                place="bottom"
                getContent={(dataTip:string) => {
                    console.log("DATATIP: ", dataTip) 
                    // dispatch({ type: sagaActions.FETCH_DATA_SAGA })
                    return(tipEvent(dataTip))
                }}
            />
                {/* {tipEvent()}
            </ReactTooltip> */}
        </div>
    )
}

export default Issue;
