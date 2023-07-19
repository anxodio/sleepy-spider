import { listenEvent } from 'sleepy-spider-lib'
import { getAwakeningsOfUser } from '@/infra/awakening/awakening.repository'
import { EVENTS, stores } from '@/adapter'
import { updatePreviewRanking } from '@/ui/leaderboard/preview/leaderboardPreview'
import { handlePersonalLocalRecord, removePersonalLocalRecord } from './record'

function updateRecordAndPreviewRanking (record) {
  handlePersonalLocalRecord(record)
  updatePreviewRanking(record)
}

function updateRecordWithMaxScore () {
  const awakeningStore = stores.awakening
  getAwakeningsOfUser()
  .then(({ awakenings }) => {
    const record = Math.max(awakenings, awakeningStore.value)
    updateRecordAndPreviewRanking(record)
  })
}

function updateRecord () {
  const { isLogged } = stores.auth
  const awakeningStore = stores.awakening
  if (isLogged) {
    updateRecordWithMaxScore()
  } else {
    updateRecordAndPreviewRanking(awakeningStore.value)
  }
}

function handleUserLogged () {
  const awakeningStore = stores.awakening
  removePersonalLocalRecord()
  getAwakeningsOfUser()
  .then(({ existsDocument, awakenings }) => {
    if (!existsDocument) return
    if (awakeningStore.value > awakenings) return
    updateRecordAndPreviewRanking(awakenings)
  })
}

function prepareRecord () {
  listenEvent(EVENTS.END_TIMER, updateRecord)
  listenEvent(EVENTS.USER_LOGGED, handleUserLogged)
}

export { prepareRecord }
