/*
File:      github.com/ETmbit/make-2.ts
Copyright: ETmbit, 2026

License:
This file is part of the ETmbit extensions for MakeCode for micro:bit.
It is free software and you may distribute it under the terms of the
GNU General Public License (version 3 or later) as published by the
Free Software Foundation. The full license text you find at
https://www.gnu.org/licenses.

Disclaimer:
ETmbit extensions are distributed without any warranty.

Dependencies:
ETmbit/general, ETmbit/gamebuilder, ETmbit/buttonpad
*/

enum GameState {
    None,
    Left,
    Right
}

let ETstate = GameState.None
let time = 0
let delay = 1000

function plotLeft(x: number, y: number) {
    led.plot(0, 2)
    led.plot(0, 3)
    led.plot(1, 3)
    led.plot(0, 4)
    led.plot(1, 4)
    led.plot(2, 4)
}

function plotRight(x: number, y: number) {
    led.plot(4, 2)
    led.plot(4, 3)
    led.plot(3, 3)
    led.plot(4, 4)
    led.plot(3, 4)
    led.plot(2, 4)
}

function unplotLeft() {
    led.unplot(0, 2)
    led.unplot(0, 3)
    led.unplot(1, 3)
    led.unplot(0, 4)
    led.unplot(1, 4)
    led.unplot(2, 4)
}

function unplotRight() {
    led.unplot(4, 2)
    led.unplot(4, 3)
    led.unplot(3, 3)
    led.unplot(4, 4)
    led.unplot(3, 4)
    led.unplot(2, 4)
}

Game.createSprite("sl", 3, 3, plotLeft, unplotLeft)
Game.createSprite("sr", 3, 3, plotRight, unplotRight)

function newState() {
    delay -= 200
    if (delay <= 0)
        Game.stopGame()
    else {
        ETscore += 1
        basic.clearScreen()
        basic.pause(250)
        ETstate = (Math.randomBoolean() ? GameState.Left : GameState.Right)
        if (ETstate == GameState.Left) {
            Game.show("sr", Visible.No)
            Game.show("sl", Visible.Yes)
        }
        else {
            Game.show("sl", Visible.No)
            Game.show("sr", Visible.Yes)
        }
        time = control.millis() + delay
    }
}

gameStartHandler = () => {
    delay = 3200
    newState()
}

gamePlayHandler = () => {
    if (time < control.millis())
        Game.stopGame()
}

ButtonPad.onButton(Pad.TopLeft, function () {
    if (!Game.isPlaying()) return
    if (ETstate == GameState.Right)
        Game.stopGame()
    else
        newState()
})

ButtonPad.onButton(Pad.TopRight, function () {
    if (!Game.isPlaying()) return
    if (ETstate == GameState.Left)
        Game.stopGame()
    else
        newState()
})

//% color="#00CC00" icon="\uf1f9"
//% block="Hoe snel ben jij"
namespace HoeSnelBenJij {
    //% block="start the game"
    //% block.loc.nl="start het spel"
    export function start() {
        Game.startGame()
    }
}
