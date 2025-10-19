let tm: number
let pos: number
let on: boolean
let press: boolean
let score: number
let play: boolean = false

let logoHandler: () => void

basic.showIcon(IconNames.Heart)

function randomMSec(): number {
    return 1000 + ((control.millis() / 10) % 1) * 2000
}

function randomPos(): number {
    if (Math.randomBoolean())
        return 4
    else
        return 0
}

function gameOver() {
    if (!play) return
    play = false
    basic.pause(500)
    basic.showIcon(IconNames.No)
    basic.pause(250)
    basic.clearScreen()
    if (score)
        basic.showNumber(score)
    else
        basic.showIcon(IconNames.Sad)
    basic.pause(1000)
    basic.showIcon(IconNames.Heart)
}

basic.forever(function () {
    if (tm < 0) return
    basic.pause(randomMSec())
    pos = (randomPos())
    if (!play) return
    led.plot(pos, 2)
    on = true
    basic.pause(tm)
    led.unplot(pos, 2)
    on = false
    tm -= 50
    if (!press)
        gameOver()
    press = false
})

input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (logoHandler) logoHandler()
})

input.onButtonPressed(Button.A, function () {
    if (!on || (pos == 4))
        gameOver()
    else {
        press = true
        score += 1
    }
})

input.onButtonPressed(Button.B, function () {
    if (!on || (pos == 0))
        gameOver()
    else {
        press = true
        score += 1
    }
})


//% color="#00CC00" icon="\uf1f9"
//% block="Game"
//% block.loc.nl="Spel"
namespace Game {

    //% block="start the game"
    //% block.loc.nl="start het spel"
    export function startGame() {
        basic.clearScreen()
        basic.pause(1000)
        press = false
        on = false
        tm = 1000
        pos = -1
        score = 0
        play = true
    }

    //% color="#FFC000"
    //% block="when logo is pressed"
    //% block.loc.nl="wanneer op het logo wordt gedrukt"
    export function onStart(code: () => void): void {
        logoHandler = code
    }
}
