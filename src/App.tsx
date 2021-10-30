import React from 'react';
import {Rule,RuleGroup} from './Rules'
import Group from './Components/GroupFilters'
import QueryString from './Components/QueryString'
import './App.css';

const blankFilter: Rule = {
  field: 'None',
  condition: 'None', 
  value: 'None',
  type: 'rule'
}

const blankGroup: RuleGroup = {
  children: [JSON.parse(JSON.stringify(blankFilter))],
  conjunction: "AND",
  not: false,
  type: 'rule_group',
};

const blankGroupList: (RuleGroup)[] = [JSON.parse(JSON.stringify(blankGroup))];

type MyState = {
  groupFilters: RuleGroup[], 
  AND: 'AND' | 'OR',
}


class App extends React.Component<Record<string, never>, MyState> {

  state : MyState = {
    groupFilters: [...blankGroupList],
    AND: 'AND'
  };

  handleGroupCombine = (event: any) => {
    this.setState({AND: (event.target.value==='AND' ? 'AND' : 'OR')});
  } 

  handleEditFilter = (filter: Rule, group_idx: number, idx: number) =>  {
    const groups = this.state.groupFilters;
    groups[group_idx].children[idx] = JSON.parse(JSON.stringify(filter));
    this.setState({groupFilters: groups});
  };
 
  handleAddFilter = (filter: Rule, idx: number) =>  {
    // only if filters are filled
    if(
        this.state.groupFilters[idx].children.slice(-1)[0].field !== 'None' &&
        this.state.groupFilters[idx].children.slice(-1)[0].value !== 'None' &&
        this.state.groupFilters[idx].children.slice(-1)[0].condition !== 'None'
    )
    {
      const groups = this.state.groupFilters;
      groups[idx].children.push(filter);
      this.setState({groupFilters: groups});
    }
  };
  
  handleAddGroup = (group: RuleGroup) =>  {
    // only if previous group has any filters
    if(this.state.groupFilters.slice(-1)[0].children.length > 1)
    {
      const groups = this.state.groupFilters;
      groups.push(group);
      this.setState({groupFilters: groups});
    }
  };
  
  handleConjunction = (conjuction: ('AND' | 'OR'),  idx: number) =>  {
    const groups = this.state.groupFilters;
    console.log(groups[idx]);
    groups[idx].conjunction = conjuction;
    this.setState({groupFilters: groups});
  };

  handleNot = (idx: number) =>  {
    const groups = this.state.groupFilters;
    groups[idx].not = !(this.state.groupFilters[idx].not);
    this.setState({groupFilters: groups});
  };

  render() {
    return (
      <div>
          <div className="query">
            <QueryString state = {this.state} />
          </div>
          <div className = "QueryBuilder">
            <select className="Conjunction" name="Join" id="Join" onChange =  {this.handleGroupCombine}>
                      <option value="AND">AND</option>
                      <option value="OR">OR</option>
            </select>
            {
              this.state.groupFilters.map((group : RuleGroup,idx : number) => {
                return(
                  <div className="GroupBlock">
                    <select className="Conjunction" name="Join" id="Join" onChange =  {(event)=>this.handleConjunction((event.target.value==='AND' ? 'AND' : 'OR'),idx)}>
                      <option value="AND">AND</option>
                      <option value="OR">OR</option>
                    </select>
                    <label> NOT: <input type="checkbox" id="NOT" name="NOT" value="NOT" onClick = {()=>this.handleNot(idx)}/></label>
                    
                    <Group 
                      group = {group} 
                      handleAddFilter = {this.handleAddFilter} 
                      handleEditFilter ={this.handleEditFilter} 
                      idx = {idx}
                    />
                  </div>
                );
              })
            }
            
          <button 
            className="Button"
            onClick = 
              {()=>this.handleAddGroup(JSON.parse(JSON.stringify(blankGroup)))}>
                Add new group list
          </button>
          <button 
            className="Button"
          >
              Finish
          </button>

        </div>
      </div>
    )
  };
}

export default App;
