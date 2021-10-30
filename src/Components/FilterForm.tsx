import React from 'react';
import "./FilterForm.css"
import { predictionFields, commonFields, conditions, criterias } from '../consts';

function FilterForm(props: any) {

  
  const handleFieldChange = (event: any) => {
    const rule = props.rules;
    rule.field = event.target.value;
    props.handleEditFilter(rule,props.group_idx,props.idx);
  }
  const handleConditionChange = (event: any) => {
    const rule = props.rules;
    rule.condition = event.target.value;
    props.handleEditFilter(rule,props.group_idx,props.idx);
  }
  const handleCriteriaChange = (event: any) => {
    const rule = props.rules;
    rule.value = event.target.value;
    props.handleEditFilter(rule,props.group_idx,props.idx);
  }

  return (
    <div className="FilterForm">
      <select className="dropdown" name="Field" id="Field" onChange={handleFieldChange}>
        <option value='None' disabled selected hidden>Select Field</option>
        <optgroup label="Prediction">
          {
            predictionFields.map(field => {
              return (
                <option value={field}>{field}</option>
              )
            })
          }
        </optgroup>
        <optgroup label="Common">
          {
            commonFields.map(field => {
              return (
                <option value={field}>{field}</option>
              )
            })
          }
        </optgroup>
      </select>

      <select className="dropdown" name="Condition" id="Condition" onChange={handleConditionChange}>
        <option value='None' disabled selected hidden>Select Condition</option>
        <optgroup label="Prediction">
          {
            conditions.map(field => {
              return (
                <option value={field}>{field}</option>
              )
            })
          }
        </optgroup>
      </select>

      <select className="dropdown" name="Value" id="Value" onChange={handleCriteriaChange}>
        <option value='None' disabled selected hidden>Select Value</option>
          {
            criterias.map(field => {
              return (
                <option value={field}>{field}</option>
              )
            })
          }
      </select>
    </div>
  )
}
export default FilterForm;