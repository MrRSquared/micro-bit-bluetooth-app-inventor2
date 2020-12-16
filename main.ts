bluetooth.onBluetoothConnected(function () {
    basic.showString("C")
    connected = 1
    while (connected == 1) {
        uartData = bluetooth.uartReadUntil(":")
        if (uartData.substr(0, 1).compare("G") == 0) {
            pins.digitalWritePin(DigitalPin.P13, 0)
            basic.showIcon(IconNames.No)
        }
        if (uartData.substr(0, 1).compare("K") == 0) {
            basic.showIcon(IconNames.Yes)
            pins.digitalWritePin(DigitalPin.P13, 1)
            basic.pause(500)
            pins.digitalWritePin(DigitalPin.P13, 0)
        }
        if (uartData.substr(0, 1).compare("T") == 0) {
            basic.showIcon(IconNames.Yes)
            pins.digitalWritePin(DigitalPin.P13, 1)
            basic.pause(500)
            pins.digitalWritePin(DigitalPin.P13, 0)
        }
        if (uartData.substr(0, 1).compare("M") == 0) {
            start = 1
            tempsum = 0
        }
        if (start == 1) {
            if (pins.analogReadPin(AnalogPin.P2) < 200 && wb == 1) {
                wb = 0
                tempsum = tempsum + 1
                nowtime = input.runningTime()
            }
            if (pins.analogReadPin(AnalogPin.P2) > 200 && wb == 0) {
                wb = 1
                tempsum = tempsum + 1
                nowtime = input.runningTime()
            }
            if (input.runningTime() - nowtime > 4000) {
                start = 0
                bluetooth.uartWriteString(convertToText(tempsum))
            }
        }
    }
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showString("D")
    connected = 0
    start = 0
})
input.onPinPressed(TouchPin.P1, function () {
    pins.digitalWritePin(DigitalPin.P14, 1)
    basic.pause(500)
    pins.digitalWritePin(DigitalPin.P14, 0)
})
let nowtime = 0
let tempsum = 0
let uartData = ""
let wb = 0
let connected = 0
let start = 0
basic.showString("UART")
start = 0
connected = 0
wb = 0
pins.digitalWritePin(DigitalPin.P13, 0)
pins.digitalWritePin(DigitalPin.P14, 0)
basic.forever(function () {
	
})
