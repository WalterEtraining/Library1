﻿//% color="#C814B8" weight=25 icon="\uf1d4"
namespace ePantalla {
    
    export enum enColor {

        //% blockId="OFF" block="Apagado"
        OFF = 0,
        //% blockId="Red" block="Rojo"
        Red,
        //% blockId="Green" block="Verde"
        Green,
        //% blockId="Blue" block="Azul"
        Blue,
        //% blockId="White" block="Blanco"
        White,
        //% blockId="Cyan" block="Cian"
        Cyan,
        //% blockId="Pinkish" block="Magenta"
        Pinkish,
        //% blockId="Yellow" block="Amarillo"
        Yellow,

    }
    export enum enLED1 {
        
        //% blockId="OFF" block="Apagado"
        OFF = 0,
        //% blockId="ON" block="Encendido"
        ON =1
    }

    //% blockId=eLED1 block="LED1|pin %pin|valor %value"
    //% weight=5
    //% blockGap=8
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=1
    export function LED1(pin: DigitalPin, value: enLED1): void {

        pins.digitalWritePin(pin, value);

    }

    //% blockId=eLED2 block="LED2|pin %pin|valor %value"
    //% weight=4
    //% blockGap=8
    //% color="#C814B8"
    //% value.min=0 value.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=2
    export function LED2(pin: AnalogPin, value: number): void {

        pins.analogWritePin(pin, value * 1024 / 256);

    }

    //% blockId=eBreathLED block="BreathLED|pin %pin"
    //% weight=3
    //% blockGap=8
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=3
    export function BreathLED(pin: AnalogPin): void {

        for (let i: number = 0; i < 1023; i++) {
            pins.analogWritePin(pin, i);
            //basic.pause(1);
            control.waitMicros(1000);
        }
        basic.pause(10);
        for (let i: number = 1023; i > 0; i--) {
            pins.analogWritePin(pin, i);
            //basic.pause(1);
            control.waitMicros(1000);
        }

    }

    //% blockId=eRGB block="RGB|pin1 %pin1|pin2 %pin2|pin3 %pin3|valor1 %value1|valor2 %value2|valor3 %value3"
    //% weight=2
    //% blockGap=8
    //% color="#C814B8"
    //% value1.min=0 value1.max=255 value2.min=0 value2.max=255 value3.min=0 value3.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB(pin1: AnalogPin, pin2: AnalogPin, pin3: AnalogPin, value1: number, value2: number, value3: number): void {

        pins.analogWritePin(pin1, value1 * 1024 / 256);
        pins.analogWritePin(pin2, value2 * 1024 / 256);
        pins.analogWritePin(pin3, value3 * 1024 / 256);

    }
    //% blockId=eRGB2 block="RGB|pin1 %pin1|pin2 %pin2|pin3 %pin3|valor %value"
    //% weight=1
    //% blockGap=8
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB2(pin1: DigitalPin, pin2: DigitalPin, pin3: DigitalPin, value: enColor): void {

        switch (value) {
            case enColor.OFF: {
                pins.digitalWritePin(pin1, 0);
                pins.digitalWritePin(pin2, 0);
                pins.digitalWritePin(pin3, 0);
                break;
            }
            case enColor.Red: {
                pins.digitalWritePin(pin1, 1);
                pins.digitalWritePin(pin2, 0);
                pins.digitalWritePin(pin3, 0);
                break;
            }
            case enColor.Green: {
                pins.digitalWritePin(pin1, 0);
                pins.digitalWritePin(pin2, 1);
                pins.digitalWritePin(pin3, 0);
                break;
            }
            case enColor.Blue: {
                pins.digitalWritePin(pin1, 0);
                pins.digitalWritePin(pin2, 0);
                pins.digitalWritePin(pin3, 1);
                break;
            }
            case enColor.White: {
                pins.digitalWritePin(pin1, 1);
                pins.digitalWritePin(pin2, 1);
                pins.digitalWritePin(pin3, 1);
                break;
            }
            case enColor.Cyan: {
                pins.digitalWritePin(pin1, 0);
                pins.digitalWritePin(pin2, 1);
                pins.digitalWritePin(pin3, 1);
                break;
            }
            case enColor.Pinkish: {
                pins.digitalWritePin(pin1, 1);
                pins.digitalWritePin(pin2, 0);
                pins.digitalWritePin(pin3, 1);
                break;
            }
            case enColor.Yellow: {
                pins.digitalWritePin(pin1, 1);
                pins.digitalWritePin(pin2, 1);
                pins.digitalWritePin(pin3, 0);
                break;
            }
        }

    }
   
}
/*****************************************************************************************************************************************
 *  传感器类 ***************************************************************************************************************************** 
 ****************************************************************************************************************************************/

//% color="#87CEEB" weight=24 icon="\uf1b6"
namespace eUltrasonido {

    export enum enVoice {
        //% blockId="Voice" block="Sonido"
        Voice = 0,
        //% blockId="NoVoice" block="Silencio"
        NoVoice = 1
    }

    export enum enIR {
        //% blockId="Get" block="Detectado"
        Get = 0,
        //% blockId="NoVoice" block="No Detectado"
        NoGet = 1
    }
    

    //% blockId=eSensor_Voz block="Sensor_Voz|pin %pin|valor %value"
    //% weight=100
    //% blockGap=10
    //% color="#87CEEB"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Sensor_Voz(pin: DigitalPin, value: enVoice): boolean {

        pins.setPull(pin, PinPullMode.PullUp);
        if (pins.digitalReadPin(pin) == value) {
            return true;
        }
        else {
            return false;
        }

    }

    function IR_send_38k() {
        for (let i: number = 0; i < 8; i++) {
            pins.digitalWritePin(DigitalPin.P9, 1);
            control.waitMicros(13);
            pins.digitalWritePin(DigitalPin.P9, 0);
            control.waitMicros(13);
        }
    }
    //% blockId=eSensor_Infrarrojo block="Sensor_Infrarrojo|pin %pin| |%value|Obstaculo"
    //% weight=100
    //% blockGap=10
    //% color="#87CEEB"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Sensor_Infrarrojo(pin: DigitalPin, value: enIR): boolean {

        pins.setPull(pin, PinPullMode.PullUp);
        //IR_send_38k();
        if (pins.digitalReadPin(pin) == value) {
            return true;
        }
        else {
            return false;
        }

    }

    //% blockId=eEnviar_Infrarrojo block="Enviar_Infrarrojo|pin %pin"
    //% weight=100
    //% blockGap=10
    //% color="#87CEEB"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Enviar_Infrarrojo(pin: DigitalPin): void {

        
        IR_send_38k();

    }
   
    //% blockId=eUltrasonico block="Ultrasonico|Trig %Trig|Echo %Echo"
    //% color="#87CEEB"
    //% weight=100
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Ultrasonico(Trig: DigitalPin, Echo: DigitalPin): number {

        // send pulse
        pins.setPull(Trig, PinPullMode.PullNone);
        pins.digitalWritePin(Trig, 0);
        control.waitMicros(2);
        pins.digitalWritePin(Trig, 1);
        control.waitMicros(15);
        pins.digitalWritePin(Trig, 0);

        // read pulse
        let d = pins.pulseIn(Echo, PulseValue.High, 23200);
        return  Math.floor(d / 58);
    }
}

/*****************************************************************************************************************************************
 *  Input *****************************************************************************************************************************
 ****************************************************************************************************************************************/

//% color="#808080" weight=23 icon="\uf11c"
namespace eEntrada {

    export enum enRocker {
        //% blockId="Nostate" block="No"
        Nostate = 0,
        //% blockId="Up" block="Arriba"
        Up,
        //% blockId="Down" block="Abajo"
        Down,
        //% blockId="Left" block="Izquierda"
        Left,
        //% blockId="Right" block="Derecha"
        Right,
        //% blockId="Press" block="Presión"
        Press
    }

    export enum enTouch {
        //% blockId="NoTouch" block="Sin Pulso"
        NoTouch = 0,
        //% blockId="Touch" block="Pulso"
        Touch = 1
    }
    export enum enButton {
        //% blockId="Press" block="Pulso"
        Press = 0,
        //% blockId="Realse" block="Sin Pulso"
        Realse = 1
    }

    //% blockId=eTouchPad block="TouchPad|pin %pin|valor %value"
    //% weight=100
    //% blockGap=10
    //% color="#808080"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function TouchPad(pin: DigitalPin, value: enTouch): boolean {

        pins.setPull(pin, PinPullMode.PullUp);
        if (pins.digitalReadPin(pin) == value) {
            return true;
        }
        else {
            return false;
        }

    }
    //% blockId=eRocker block="Rocker|VRX %pin1|VRY %pin2|SW %pin3|valor %value"
    //% weight=100
    //% blockGap=10
    //% color="#808080"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=6
    export function Rocker(pin1: AnalogPin, pin2: AnalogPin, pin3: DigitalPin, value: enRocker): boolean {

        pins.setPull(pin3, PinPullMode.PullUp);
        let x = pins.analogReadPin(pin1);
        let y = pins.analogReadPin(pin2);
        let z = pins.digitalReadPin(pin3);
        let now_state = enRocker.Nostate;

        if (x < 100) // 上
        {

            now_state = enRocker.Up;

        }
        else if (x > 700) //
        {

            now_state = enRocker.Down;
        }
        else  // 左右
        {
            if (y < 100) //右
            {
                now_state = enRocker.Right;
            }
            else if (y > 700) //左
            {
                now_state = enRocker.Left;
            }
        }
        if (z == 0)
            now_state = enRocker.Press;
        if (now_state == value)
            return true;
        else
            return false;

    }

    //% blockId=eButton block="Button|pin %pin|valor %value"
    //% weight=100
    //% blockGap=10
    //% color="#808080"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    export function Button(pin: DigitalPin, value: enButton): boolean {

        pins.setPull(pin, PinPullMode.PullUp);
        if (pins.digitalReadPin(pin) == value) {
            return true;
        }
        else {
            return false;
        }

    }  
}

/***Music Class***/

//% color="#D2691E" weight=22 icon="\uf001"
namespace eMusica {
    export enum enBuzzer {

        //% blockId="NoBeep" block="Silencio"
        NoBeep = 0,
        //% blockId="Beep" block="Sonido"
        Beep
    }

    //% blockId=eBuzzer block="Buzzer|pin %pin|valor %value"
    //% weight=100
    //% blockGap=10 
    //% color="#D2691E"
    //% value.min=0 value.max=1
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=8
    export function Buzzer(pin: DigitalPin, value: enBuzzer): void {

        pins.setPull(pin, PinPullMode.PullNone);
        pins.digitalWritePin(pin, value);

    }

}

/***MotorClass***/

//% color="#0000CD" weight=21 icon="\uf185"
namespace eMotor {

    //% blockId=eFan block="Fan|pin %pin|velocidad %value"
    //% weight=100
    //% blockGap=10
    //% color="#0000CD"
    //% value.min=0 value.max=1023
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=9
    export function Fan(pin: AnalogPin, value: number): void {

        pins.analogWritePin(pin, value);

    }

    //% blockId=eServo block="Servo|pin %pin|valor %value"
    //% weight=100
    //% blockGap=10
    //% color="#0000CD"
    //% value.min=0 value.max=180
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=9
    export function Servo(pin: AnalogPin, value: number): void {

        pins.servoWritePin(pin, value);

    }

}

//% color="#006400" weight=20 icon="\uf1b9"
namespace eBot {


    const PCA9685_ADD = 0x41
    const MODE1 = 0x00
    const MODE2 = 0x01
    const SUBADR1 = 0x02
    const SUBADR2 = 0x03
    const SUBADR3 = 0x04

    const LED0_ON_L = 0x06
    const LED0_ON_H = 0x07
    const LED0_OFF_L = 0x08
    const LED0_OFF_H = 0x09

    const ALL_LED_ON_L = 0xFA
    const ALL_LED_ON_H = 0xFB
    const ALL_LED_OFF_L = 0xFC
    const ALL_LED_OFF_H = 0xFD

    const PRESCALE = 0xFE

    let initialized = false
    let yahStrip: neopixel.Strip;

    export enum enColor {

        //% blockId="OFF" block="Apagado"
        OFF = 0,
        //% blockId="Red" block="Rojo"
        Red,
        //% blockId="Green" block="Verde"
        Green,
        //% blockId="Blue" block="Azul"
        Blue,
        //% blockId="White" block="Blanco"
        White,
        //% blockId="Cyan" block="Cian"
        Cyan,
        //% blockId="Pinkish" block="Magenta"
        Pinkish,
        //% blockId="Yellow" block="Amarillo"
        Yellow,

    }
    export enum enMusic {

        dadadum = 0,
        entertainer,
        prelude,
        ode,
        nyan,
        ringtone,
        funk,
        blues,

        birthday,
        wedding,
        funereal,
        punchline,
        baddy,
        chase,
        ba_ding,
        wawawawaa,
        jump_up,
        jump_down,
        power_up,
        power_down
    }
    export enum enPos {

        //% blockId="LeftState" block="Estado Izquierda"
        LeftState = 0,
        //% blockId="RightState" block="Estado Derecha"
        RightState = 1
    }

    export enum enLineState {
        //% blockId="White" block="Blanco"
        White = 0,
        //% blockId="Black" block="Negro"
        Black = 1

    }
    
    export enum enAvoidState {
        //% blockId="OBSTACLE" block="Con Obstaculos"
        OBSTACLE = 0,
        //% blockId="NOOBSTACLE" block="Sin Obstaculos"
        NOOBSTACLE = 1

    }

    
    export enum enServo {
        
        S1 = 1,
        S2,
        S3
    }
    export enum CarState {
        //% blockId="Car_Run" block="Adelante"
        Car_Run = 1,
        //% blockId="Car_Back" block="Atras"
        Car_Back = 2,
        //% blockId="Car_Left" block="Girar a la izquierda"
        Car_Left = 3,
        //% blockId="Car_Right" block="Girar a la derecha"
        Car_Right = 4,
        //% blockId="Car_Stop" block="Parar"
        Car_Stop = 5,
        //% blockId="Car_SpinLeft" block="Rotar a la izquierda"
        Car_SpinLeft = 6,
        //% blockId="Car_SpinRight" block="Rotar a la derecha"
        Car_SpinRight = 7
    }

    function i2cwrite(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function i2ccmd(addr: number, value: number) {
        let buf = pins.createBuffer(1)
        buf[0] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function i2cread(addr: number, reg: number) {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
        return val;
    }

    function initPCA9685(): void {
        i2cwrite(PCA9685_ADD, MODE1, 0x00)
        setFreq(50);
        initialized = true
    }

    function setFreq(freq: number): void {
        // Constrain the frequency
        let prescaleval = 25000000;
        prescaleval /= 4096;
        prescaleval /= freq;
        prescaleval -= 1;
        let prescale = prescaleval; //Math.Floor(prescaleval + 0.5);
        let oldmode = i2cread(PCA9685_ADD, MODE1);
        let newmode = (oldmode & 0x7F) | 0x10; // sleep
        i2cwrite(PCA9685_ADD, MODE1, newmode); // go to sleep
        i2cwrite(PCA9685_ADD, PRESCALE, prescale); // set the prescaler
        i2cwrite(PCA9685_ADD, MODE1, oldmode);
        control.waitMicros(5000);
        i2cwrite(PCA9685_ADD, MODE1, oldmode | 0xa1);
    }

    function setPwm(channel: number, on: number, off: number): void {
        if (channel < 0 || channel > 15)
            return;
        if (!initialized) {
            initPCA9685();
        }
        let buf = pins.createBuffer(5);
        buf[0] = LED0_ON_L + 4 * channel;
        buf[1] = on & 0xff;
        buf[2] = (on >> 8) & 0xff;
        buf[3] = off & 0xff;
        buf[4] = (off >> 8) & 0xff;
        pins.i2cWriteBuffer(PCA9685_ADD, buf);
    }


    function Car_run(speed1: number, speed2: number) {

        speed1 = speed1 * 16; // map 350 to 4096
        speed2 = speed2 * 16;
        if (speed1 >= 4096) {
            speed1 = 4095
        }
        if (speed1 <= 350) {
            speed1 = 350
        }
        if (speed2 >= 4096) {
            speed2 = 4095
        }
        if (speed2 <= 350) {
            speed2 = 350
        }

        setPwm(12, 0, speed1);
        setPwm(13, 0, 0);

        setPwm(15, 0, speed2);
        setPwm(14, 0, 0);
        //pins.digitalWritePin(DigitalPin.P16, 1);
       // pins.analogWritePin(AnalogPin.P1, 1023-speed); //速度控制

       // pins.analogWritePin(AnalogPin.P0, speed);//速度控制
       // pins.digitalWritePin(DigitalPin.P8, 0);
    }

    function Car_back(speed1: number, speed2: number) {

        speed1 = speed1 * 16; // map 350 to 4096
        speed2 = speed2 * 16;
        if (speed1 >= 4096) {
            speed1 = 4095
        }
        if (speed1 <= 350) {
            speed1 = 350
        }
        if (speed2 >= 4096) {
            speed2 = 4095
        }
        if (speed2 <= 350) {
            speed2 = 350
        }

        setPwm(12, 0, 0);
        setPwm(13, 0, speed1);

        setPwm(15, 0, 0);
        setPwm(14, 0, speed2);

        //pins.digitalWritePin(DigitalPin.P16, 0);
        //pins.analogWritePin(AnalogPin.P1, speed); //速度控制

        //pins.analogWritePin(AnalogPin.P0, 1023 - speed);//速度控制
        //pins.digitalWritePin(DigitalPin.P8, 1);
    }

    function Car_left(speed1: number, speed2: number) {

        speed1 = speed1 * 16; // map 350 to 4096
        speed2 = speed2 * 16;
        if (speed1 >= 4096) {
            speed1 = 4095
        }
        if (speed1 <= 350) {
            speed1 = 350
        }
        if (speed2 >= 4096) {
            speed2 = 4095
        }
        if (speed2 <= 350) {
            speed2 = 350
        }
        
        setPwm(12, 0, speed1);
        setPwm(13, 0, 0);

        setPwm(15, 0, speed2);
        setPwm(14, 0, 0);

        //pins.analogWritePin(AnalogPin.P0, speed);
        //pins.digitalWritePin(DigitalPin.P8, 0);

        //pins.digitalWritePin(DigitalPin.P16, 0);
        //pins.digitalWritePin(DigitalPin.P1, 0);
    }

    function Car_right(speed1: number, speed2: number) {

        speed1 = speed1 * 16; // map 350 to 4096
        speed2 = speed2 * 16;
        if (speed1 >= 4096) {
            speed1 = 4095
        }
        if (speed1 <= 350) {
            speed1 = 350
        }
        if (speed2 >= 4096) {
            speed2 = 4095
        }
        if (speed2 <= 350) {
            speed2 = 350
        }
        
        setPwm(12, 0, speed1);
        setPwm(13, 0, 0);

        setPwm(15, 0, speed2);
        setPwm(14, 0, 0);
        //pins.digitalWritePin(DigitalPin.P0, 0);
        //pins.digitalWritePin(DigitalPin.P8, 0);

        //pins.digitalWritePin(DigitalPin.P16, 1);
       // pins.analogWritePin(AnalogPin.P1, 1023 - speed);
    }

    function Car_stop() {
       
        setPwm(12, 0, 0);
        setPwm(13, 0, 0);

        setPwm(15, 0, 0);
        setPwm(14, 0, 0);
        //pins.digitalWritePin(DigitalPin.P0, 0);
        //pins.digitalWritePin(DigitalPin.P8, 0);
        //pins.digitalWritePin(DigitalPin.P16, 0);
        //pins.digitalWritePin(DigitalPin.P1, 0);
    }

    function Car_spinleft(speed1: number, speed2: number) {

        speed1 = speed1 * 16; // map 350 to 4096
        speed2 = speed2 * 16;
        if (speed1 >= 4096) {
            speed1 = 4095
        }
        if (speed1 <= 350) {
            speed1 = 350
        }
        if (speed2 >= 4096) {
            speed2 = 4095
        }
        if (speed2 <= 350) {
            speed2 = 350
        }        
        
        setPwm(12, 0, 0);
        setPwm(13, 0, speed1);

        setPwm(15, 0, speed2);
        setPwm(14, 0, 0);

        //pins.analogWritePin(AnalogPin.P0, speed);
        //pins.digitalWritePin(DigitalPin.P8, 0);

        //pins.digitalWritePin(DigitalPin.P16, 0);
        //pins.analogWritePin(AnalogPin.P1, speed);
    } 

    function Car_spinright(speed1: number, speed2: number) {

        speed1 = speed1 * 16; // map 350 to 4096
        speed2 = speed2 * 16;
        if (speed1 >= 4096) {
            speed1 = 4095
        }
        if (speed1 <= 350) {
            speed1 = 350
        }
        if (speed2 >= 4096) {
            speed2 = 4095
        }
        if (speed2 <= 350) {
            speed2 = 350
        }    
            
        setPwm(12, 0, speed1);
        setPwm(13, 0, 0);

        setPwm(15, 0, 0);
        setPwm(14, 0, speed2);
        //pins.analogWritePin(AnalogPin.P0, 1023-speed);
        //pins.digitalWritePin(DigitalPin.P8, 1);

        //pins.digitalWritePin(DigitalPin.P16, 1);
        //pins.analogWritePin(AnalogPin.P1, 1023-speed);

    }

    /**
     * *****************************************************************
     * @param index
     */
    //% blockId=eRGB_Tab_Control block="RGB_Tab_Control|valor %value"
    //% weight=101
    //% blockGap=10
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB_Tab_Control(value: enColor): void {

        switch (value) {
            case enColor.OFF: {
                setPwm(0, 0, 0);
                setPwm(1, 0, 0);
                setPwm(2, 0, 0);
                break;
            }
            case enColor.Red: {
                setPwm(0, 0, 4095);
                setPwm(1, 0, 0);
                setPwm(2, 0, 0);
                break;
            }
            case enColor.Green: {
                setPwm(0, 0, 0);
                setPwm(1, 0, 4095);
                setPwm(2, 0, 0);
                break;
            }
            case enColor.Blue: {
                setPwm(0, 0, 0);
                setPwm(1, 0, 0);
                setPwm(2, 0, 4095);
                break;
            }
            case enColor.White: {
                setPwm(0, 0, 4095);
                setPwm(1, 0, 4095);
                setPwm(2, 0, 4095);
                break;
            }
            case enColor.Cyan: {
                setPwm(0, 0, 0);
                setPwm(1, 0, 4095);
                setPwm(2, 0, 4095);
                break;
            }
            case enColor.Pinkish: {
                setPwm(0, 0, 4095);
                setPwm(1, 0, 0);
                setPwm(2, 0, 4095);
                break;
            }
            case enColor.Yellow: {
                setPwm(0, 0, 4095);
                setPwm(1, 0, 4095);
                setPwm(2, 0, 0);
                break;
            }
        }
    }
    //% blockId=eRGB_eX3 block="RGB_eX3|valor1 %value1|valor2 %value2|valor3 %value3"
    //% weight=100
    //% blockGap=10
    //% color="#C814B8"
    //% value1.min=0 value1.max=255 value2.min=0 value2.max=255 value3.min=0 value3.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB_eX3(value1: number, value2: number, value3: number): void {

        let R = value1 * 16;
        let G = value2 * 16;
        let B = value3 * 16;

        if (R > 4096)
            R = 4095;
        if (G > 4096)
            G = 4095;
        if (B > 4096)
            B = 4095;

        setPwm(0, 0, R);
        setPwm(1, 0, G);
        setPwm(2, 0, B);

    }

    //% blockId=eRGB_Programa_Robot block="RGB_Programa_Robot"
    //% weight=99
    //% blockGap=10
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB_Programa_Robot(): neopixel.Strip {
         
        if (!yahStrip) {
            yahStrip = neopixel.create(DigitalPin.P16, 3, NeoPixelMode.RGB);
        }
        return yahStrip;  
    }


	//% blockId=eUltrasonido_Robot block="Ultrasonido retorna distancia(cm)"
    //% color="#006400"
    //% weight=98
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Ultrasonido_Robot(): number {

        // send pulse
        pins.setPull(DigitalPin.P14, PinPullMode.PullNone);
        pins.digitalWritePin(DigitalPin.P14, 0);
        control.waitMicros(2);
        pins.digitalWritePin(DigitalPin.P14, 1);
        control.waitMicros(15);
        pins.digitalWritePin(DigitalPin.P14, 0);

        // read pulse
        let d = pins.pulseIn(DigitalPin.P15, PulseValue.High, 43200);
        return  Math.floor(d / 58);
    }

    //% blockId=eMusica_Robot block="Musica_Robot|%index"
    //% weight=97
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Musica_Robot(index: enMusic): void {
        switch (index) {
            case enMusic.dadadum: music.beginMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once); break;
            case enMusic.birthday: music.beginMelody(music.builtInMelody(Melodies.Birthday), MelodyOptions.Once); break;
            case enMusic.entertainer: music.beginMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once); break;
            case enMusic.prelude: music.beginMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.Once); break;
            case enMusic.ode: music.beginMelody(music.builtInMelody(Melodies.Ode), MelodyOptions.Once); break;
            case enMusic.nyan: music.beginMelody(music.builtInMelody(Melodies.Nyan), MelodyOptions.Once); break;
            case enMusic.ringtone: music.beginMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once); break;
            case enMusic.funk: music.beginMelody(music.builtInMelody(Melodies.Funk), MelodyOptions.Once); break;
            case enMusic.blues: music.beginMelody(music.builtInMelody(Melodies.Blues), MelodyOptions.Once); break;
            case enMusic.wedding: music.beginMelody(music.builtInMelody(Melodies.Wedding), MelodyOptions.Once); break;
            case enMusic.funereal: music.beginMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.Once); break;
            case enMusic.punchline: music.beginMelody(music.builtInMelody(Melodies.Punchline), MelodyOptions.Once); break;
            case enMusic.baddy: music.beginMelody(music.builtInMelody(Melodies.Baddy), MelodyOptions.Once); break;
            case enMusic.chase: music.beginMelody(music.builtInMelody(Melodies.Chase), MelodyOptions.Once); break;
            case enMusic.ba_ding: music.beginMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once); break;
            case enMusic.wawawawaa: music.beginMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once); break;
            case enMusic.jump_up: music.beginMelody(music.builtInMelody(Melodies.JumpUp), MelodyOptions.Once); break;
            case enMusic.jump_down: music.beginMelody(music.builtInMelody(Melodies.JumpDown), MelodyOptions.Once); break;
            case enMusic.power_up: music.beginMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once); break;
            case enMusic.power_down: music.beginMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once); break;
        }
    }
    //% blockId=eServo_Motor block="Servo_Motor|número %num|valor %value"
    //% weight=96
    //% blockGap=10
    //% color="#006400"
    //% num.min=1 num.max=3 value.min=0 value.max=180
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=9
    export function Servo_Motor(num: enServo, value: number): void {

        // 50hz: 20,000 us
        let us = (value * 1800 / 180 + 600); // 0.6 ~ 2.4
        let pwm = us * 4096 / 20000;
        setPwm(num + 2, 0, pwm);

    }

    //% blockId=eSensor_Evitar block="Sensor_Evitar|valor %value"
    //% weight=95
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function Sensor_Evitar(value: enAvoidState): boolean {

        let temp: boolean = false;
        pins.digitalWritePin(DigitalPin.P9, 0);
        switch (value) {
            case enAvoidState.OBSTACLE: {
                if (pins.analogReadPin(AnalogPin.P3) < 800) {
                
                    temp = true;
                    setPwm(8, 0, 0);
                }
                else {                 
                    temp = false;
                    setPwm(8, 0, 4095);
                }
                break;
            }

            case enAvoidState.NOOBSTACLE: {
                if (pins.analogReadPin(AnalogPin.P3) > 800) {

                    temp = true;
                    setPwm(8, 0, 4095);
                }
                else {
                    temp = false;
                    setPwm(8, 0, 0);
                }
                break;
            }
        }
        pins.digitalWritePin(DigitalPin.P9, 1);
        return temp;

    }
    //% blockId=eSensor_Linea block="Sensor_Linea|directo %direct|valor %value"
    //% weight=94
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function Sensor_Linea(direct: enPos, value: enLineState): boolean {

        let temp: boolean = false;

        switch (direct) {
            case enPos.LeftState: {
                if (pins.analogReadPin(AnalogPin.P2) < 500) {
                    if (value == enLineState.White) {
                        temp = true;
                    }
                    setPwm(7, 0, 4095);
                }
                else {
                    if (value == enLineState.Black) {
                        temp = true;
                    }
                    setPwm(7, 0, 0);
                }
                break;
            }

            case enPos.RightState: {
                if (pins.analogReadPin(AnalogPin.P1) < 500) {
                    if (value == enLineState.White) {
                        temp = true;
                    }
                    setPwm(6, 0, 4095);
                }
                else {
                    if (value == enLineState.Black) {
                        temp = true;
                    }
                    setPwm(6, 0, 0);
                }
                break;
            }
        }
        return temp;

    }
    //% blockId=eControl_Robot block="Control_Robot|%index"
    //% weight=93
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Control_Robot(index: CarState): void {
        switch (index) {
            case CarState.Car_Run: Car_run(255, 255); break;
            case CarState.Car_Back: Car_back(255, 255); break;
            case CarState.Car_Left: Car_left(0, 255); break;
            case CarState.Car_Right: Car_right(255, 0); break;
            case CarState.Car_Stop: Car_stop(); break;
            case CarState.Car_SpinLeft: Car_spinleft(255, 255); break;
            case CarState.Car_SpinRight: Car_spinright(255, 255); break;
        }
    }
    //% blockId=eControl_Robot_Velocidad block="Control_Robot_Velocidad|%index|velocidad %speed"
    //% weight=92
    //% blockGap=10
    //% speed.min=0 speed.max=255
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Control_Robot_Velocidad(index: CarState, speed: number): void {
        switch (index) {
            case CarState.Car_Run: Car_run(speed, speed); break;
            case CarState.Car_Back: Car_back(speed, speed); break;
            case CarState.Car_Left: Car_left(speed, speed); break;
            case CarState.Car_Right: Car_right(speed, speed); break;
            case CarState.Car_Stop: Car_stop(); break;
            case CarState.Car_SpinLeft: Car_spinleft(speed, speed); break;
            case CarState.Car_SpinRight: Car_spinright(speed, speed); break;
        }
    }
    //% blockId=eControl_Robot_Velocidad_X2 block="Control_Robot_Velocidad_X2|%index|velocidad1 %speed1|velocidad2 %speed2"
    //% weight=91
    //% blockGap=10
    //% speed1.min=0 speed1.max=255 speed2.min=0 speed2.max=255
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function Control_Robot_Velocidad_X2(index: CarState, speed1: number, speed2: number): void {
        switch (index) {
            case CarState.Car_Run: Car_run(speed1, speed2); break;
            case CarState.Car_Back: Car_back(speed1, speed2); break;
            case CarState.Car_Left: Car_left(speed1, speed2); break;
            case CarState.Car_Right: Car_right(speed1, speed2); break;
            case CarState.Car_Stop: Car_stop(); break;
            case CarState.Car_SpinLeft: Car_spinleft(speed1, speed2); break;
            case CarState.Car_SpinRight: Car_spinright(speed1, speed2); break;
        }
    }
}
