import { startAwakeningsSystem } from '@/infra/awakening/awakening.repository'
import { updateAwakeningsCounter } from '@/ui/awakeningCounter/drawAwakeningCount'

const signInSubtitle = document.getElementById('sign-in-subtitle')
const userCounter = document.getElementById('user-counter')

async function handleLogin ({ user, database, onShowQuestion }) {
  if (!database) throw new Error('Unknown database')
  if (!user) throw new Error('Error with unknown user')

  const { addAwakening, setUser } = await startAwakeningsSystem({
    database,
    onChange: updateAwakeningsCounter,
    onShowQuestion,
  })
  await setUser(user)

  signInSubtitle.style.display = 'none'
  userCounter.style.display = 'block'

  return { addAwakening }
}

function handleLogout () {
  userCounter.style.display = 'none'
}

export {
  handleLogin,
  handleLogout,
}
