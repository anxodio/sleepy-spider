import { prepareGUI } from '@/ui/gui'
import { prepareFinalScreen } from '@/ui/screens/finalScreen/finalScreen'
import { prepareRecord } from '@/ui/screens/finalScreen/record/prepareRecord'
import { prepareLeaderboard } from '@/ui/screens/leaderboard/leaderboard'
import { prepareClock } from '@/ui/components/clock/clock'
import { prepareSignIn } from '@/ui/authentication/signIn'
import { prepareTabControl } from '@/ui/components/tabControl/tabControl'

const sections = [
  prepareGUI,
  prepareFinalScreen,
  prepareRecord,
  prepareClock,
  prepareSignIn,
  prepareLeaderboard,
  prepareTabControl,
]

const prepareSections = () => {
  sections.forEach(section => section())
}

export {
  prepareSections,
}
