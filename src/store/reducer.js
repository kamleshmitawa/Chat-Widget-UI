
const defaultState = {
    loader: false,
    chatClient: {}
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case "LOADER":
            return { ...state }
        default:
            return state
    }
}

export default reducer