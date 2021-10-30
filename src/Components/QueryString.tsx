import React from 'react';
import './QueryString.css';
import { queryBuilder } from '../Utils'


function QueryString(props: any) {
    
    return (     
        <div>   
            Build your Query:<br/>
            <div className="QueryText">
                Query: {queryBuilder(props.state)}
            </div>
        </div>   
    );         
}

export default QueryString;
  