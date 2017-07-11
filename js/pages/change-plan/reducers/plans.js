export default function plans (state = {}, action) {
  switch (action.type) {
    case 'TOGGLE_DROPDOWN':
      return state.map((plan) => {
        if (plan.id === action.plan.id) {
          return Object.assign({}, plan, {
            expanded: !plan.expanded,
            maxHeight: (plan.maxHeight === '') ? action.plan.maxHeight : ''
          })
        }
        return plan
      })
    default:
      return state
  }
}
