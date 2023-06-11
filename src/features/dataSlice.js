import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    objectId: 2050,
    apiData: {}
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setData: (state, action) => {
            return {...state, apiData : action.payload}
        },
        incrementId: (state, action) => {
            return { ...state, objectId: state.objectId + 1 }
        },
        decrementId: (state, action) => {
            return { ...state, objectId: state.objectId - 1 }
        },
        customId: (state, action) => {
            return { ...state, objectId: action.payload }
        },
        resetData: () => {
            return initialState
        },
      
    }
})

export const fetchData = () => {
    const dataThunk = async (dispatch, getState) => {
        let state = getState()
        let res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${state.data.objectId}`)
        let resData = await res.json()
        dispatch(setData(resData))
    }
    return dataThunk
}
export const { setData, incrementId, decrementId, customId, resetData, } = dataSlice.action

export default dataSlice.reducer