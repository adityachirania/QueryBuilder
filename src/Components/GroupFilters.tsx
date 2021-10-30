import React from 'react';
import { Rule } from '../Rules';
import FilterForm from './FilterForm'
import './GroupFilters.css'


function Group(props: any) {
    const blankFilter: Rule = {
        field: 'None',
        condition: 'None', 
        value: 'None',
        type: 'rule'
    }
    
    return (     
        <div>       
            {props.group.children.map((rule: Rule,idx: number) => {
                return(
                  <FilterForm 
                    rules = {rule} 
                    handleEditFilter={props.handleEditFilter} 
                    group_idx={props.idx} 
                    idx = {idx}
                  />
                );
            })}
            <button className="Button" onClick = {()=>props.handleAddFilter(JSON.parse(JSON.stringify(blankFilter)), props.idx)}>Add filter</button>
        </div>   
    );         
}

export default Group;
  