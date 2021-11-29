const initialState = ''


export const setFilter = (inputText) => {
    return {
        type: 'setFilter',
        filter: inputText
    }
}

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'setFilter':
            return action.filter
        default:
            return state
    }
}

export default filterReducer