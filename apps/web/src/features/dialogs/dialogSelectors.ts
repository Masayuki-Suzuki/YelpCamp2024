import { RootState } from '../../store'

export const selectDialogStatus = (state: RootState) => state.alertDialog.isOpen
export const selectDialogData = (state: RootState) => state.alertDialog
export const selectDialogStatusCode = (state: RootState) => state.alertDialog.status
