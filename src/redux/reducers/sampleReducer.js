const sampleReducer = (state = '', action) => {
    switch (action.type) {
        case 'DISPATCH_TYPE': console.log('Hello from sampleReducer');
        default: return state;
    }
}

export default sampleReducer;