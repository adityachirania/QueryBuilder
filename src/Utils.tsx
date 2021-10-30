import { Rule,RuleGroup } from "./Rules";

export type MyState = {
    groupFilters: RuleGroup[], 
    AND: 'AND' | 'OR',
}

export function getRuleString(rule: Rule) {
    let query : string = "";
    query = " ( " + query + "field." + rule.field;
    query = query + " " + rule.condition + " ";
    query = query + rule.value + " ) ";
    return query;
}

export function queryBuilder(props: MyState) {
    const groupFilters = props.groupFilters;
    const AND = props.AND;
    let query: string = " ( ";

    groupFilters.forEach((group:any,group_idx: number) => {

        const group_symbol: string = (AND === 'AND' ? "&&" : "||");

        if(group.children.length > 1) {
            // NOT if set to true
            if(group.not === true) 
                query = query + '!';

            query = query + " ( ";
            const symbol = (group.conjunction === 'AND' ? "&&" : "||")
            group.children.forEach((rule: Rule,idx: number) => {
                if(idx < group.children.length - 1) {
                    query = query + getRuleString(rule);
                    if(idx < group.children.length - 2) {
                        query = query + symbol;
                    }
                }
            })
            query = query + " ) ";
        }

        // Add conjunction until penultimate group
        if(group_idx < groupFilters.length - 2) {
            query = query + group_symbol;
        }

        // Add conjunction only if ultimate group has atleast one filled filter
        if(group_idx === groupFilters.length - 2 && groupFilters[group_idx+1].children.length > 1) {
            query = query + group_symbol;
        }
    })
    query = query + " ) ";
    return query;
}
