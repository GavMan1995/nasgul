const initialState = {
  body: '',
  isDismissable: true,
  type: 'notice'
}

export default function message (state = initialState, action) {
  switch (action.type) {
    case 'HIDE_MESSAGE':
      return Object.assign({}, state, { body: '' })
    case 'SHOW_ERROR_MESSAGE':
      return {
        body: action.body,
        isDismissable: action.isDismissable || true,
        type: 'error'
      }
    case 'SHOW_NOTICE_MESSAGE':
      return {
        body: action.body,
        isDismissable: action.isDismissable || true,
        type: 'notice'
      }
    case 'SHOW_SUCCESS_MESSAGE':
      return {
        body: action.body,
        isDismissable: action.isDismissable || true,
        type: 'success'
      }
    default:
      return state
  }
}
