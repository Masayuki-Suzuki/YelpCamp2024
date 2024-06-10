import dialogReducer from './dialogSlices'

export {
    selectDialogStatus,
    selectDialogData,
    selectDialogStatusCode
} from './dialogSelectors'

export {
    openAlertDialog,
    closeAlertDialog,
    setDialogData
} from './dialogSlices'

export default dialogReducer
