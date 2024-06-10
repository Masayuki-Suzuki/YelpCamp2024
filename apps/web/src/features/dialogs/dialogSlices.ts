import { createSlice } from '@reduxjs/toolkit'

type AlertDialogState = {
    isOpen: boolean
    icon: 'success' | 'warning' | 'error' | 'info'
    status: number,
    header: string
    message: string,
}

const initialState: AlertDialogState = {
    isOpen: false,
    status: 400,
    header: '',
    message: '',
    icon: 'success'
}

const alertDialogSlice = createSlice({
    name: 'alertDialog',
    initialState,
    reducers: {
        openAlertDialog: (state: AlertDialogState) => {
            state.isOpen = true
        },
        closeAlertDialog: (state: AlertDialogState) => {
            state.isOpen = false
        },
        setDialogData: (state: AlertDialogState, action: { payload: AlertDialogState & { header?: string } }) => {
            state.isOpen = true
            state.icon = action.payload.icon
            state.status = action.payload.status
            state.message = action.payload.message
            state.header = action.payload.header || 'Ooooops!!'
        }
    }
})

export const {
    openAlertDialog,
    closeAlertDialog,
    setDialogData
} = alertDialogSlice.actions

export default alertDialogSlice.reducer
