export interface Rule {
    field?: 'Theme' | 'Sub-theme' | 'Reason' | 'Language' | 'Source' | 'Rating' | 'Time Period' | 'Customer ID' | 'None'
    condition?: 'Equals' | 'Does not equal' | 'Like' | 'Not like' | 'Is Empty' | 'Is' | 'Is not' | 'None'
    value?: 'Offers' | 'Performance' | 'Platform' | 'Product Feedback' | 'None'
    type: 'rule'
  }

export interface RuleGroup {
    children: (Rule)[]
    conjunction: 'AND' | 'OR'
    not: boolean
    type: 'rule_group'
}