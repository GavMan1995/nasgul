const initialState = {
  businessTotal: 0,
  businessFilled: 0,
  financialTotal: 0,
  financialFilled: 0
}

export default function profileCompletion (state = initialState, action) {
  switch (action.type) {
    case 'SET_TOTAL_FIELDS':
      const {
        businessTotal,
        businessFilled,
        financialTotal,
        financialFilled
      } = action

      return {
        businessTotal,
        businessFilled,
        financialTotal,
        financialFilled
      }
    case 'INCREMENT_FINANCIAL_COMPLETION':
      let incFinTotal = state.financialFilled + 1

      if (incFinTotal >= state.financialTotal) {
        incFinTotal = state.financialTotal
      }

      return Object.assign({}, state, { financialFilled: incFinTotal })
    case 'DECREMENT_FINANCIAL_COMPLETION':
      let decFinTotal = state.financialFilled - 1

      if (decFinTotal <= 0) decFinTotal = 0

      return Object.assign({}, state, { financialFilled: decFinTotal })
    case 'INCREMENT_BUSINESS_COMPLETION':
      let incBizTotal = state.businessFilled + 1

      if (incBizTotal >= state.businessTotal) {
        incBizTotal = state.businessTotal
      }

      return Object.assign({}, state, { businessFilled: incBizTotal })
    case 'DECREMENT_BUSINESS_COMPLETION':
      let decBizTotal = state.businessFilled - 1

      if (decBizTotal <= 0) decBizTotal = 0

      return Object.assign({}, state, { businessFilled: decBizTotal })
    default:
      return state
  }
}
