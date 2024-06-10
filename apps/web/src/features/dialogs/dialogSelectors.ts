import { RootState } from '../../store'

export const selectDialogStatus = (state: RootState) => state.alertDialog.isOpen
export const selectDialogData = (state: RootState) => state.alertDialog
