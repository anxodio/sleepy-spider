import { listenEvent, getBody } from '@/lib'
import { drawGUI } from '@/ui/gui'
import { getInfraServices } from '@/infra/infra'
import { Singleton as CachedCounter } from '@/infra/awakening/Singleton'
import params from '@/settings/settings'
import { startSpider } from '@/ui/authentication'
import { showFinalScreen } from '@/ui/finalScreen/finalScreen'
import { onRefreshReferences } from '@/components/sleepy/spider/drawSpider'
import { launchQuestion } from '@/components/question/question'
import { startClock } from '@/components/clock/clock'

(() => {
  const url = new URL('/sprites/spider/spider-spritesheet.webp', import.meta.url).href
  const spiderImage = new Image()
  spiderImage.src = url
  spiderImage.onload = () => {
    start(spiderImage)
  }
})()

function onShowQuestion (questions) {
  if (!questions || questions.length === 0) return
  const question = questions.pop()
  launchQuestion(question)
}

listenEvent('firstClick', () => {
  startClock()
})

listenEvent('endTimer', () => {
  const cachedCounter = new CachedCounter()
  const finalValue = cachedCounter.value
  showFinalScreen(finalValue)
  getBody().classList.remove('headShakeHard')
})

const start = async (spiderImage) => {
  const services = getInfraServices()
  startSpider(spiderImage, services, onShowQuestion)

  drawGUI({
    params,
    onSettingsChanges: () => {
      onRefreshReferences({ params })
    }}
  )
}

// document.addEventListener("DOMContentLoaded", () => {
  // start()
// })
