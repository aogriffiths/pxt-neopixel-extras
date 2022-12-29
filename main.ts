/**
 * Micro:Bit makeCode extension for neopixel/ws2812b matrices
 *
 *
 */

//**********************************************//
// library for NeoPixel Displays/Matrices       //
//                                              //
//Written by Sjors Smit                         //
//June 2020                                     //
//                                              //
//**********************************************//

enum startCorner{
  //% block="Top Left"
  TopLeft=1,
  //% block="Top Right"
  TopRight=2,
  //% block="Bottom Left"
  BottomLeft=3,
  //% block="Bottom Right"
  BottomRight=4,
}

enum stripPattern{
  //% block="Zig Zaging"
  zigzag=1,
  //% block="Looping"
  loop=2,

}

enum stripDirection{
  //% block="Zig Zaging"
  X=1,
  //% block="Looping"
  Y=2,

}

//% weight=6 color=#00CC60 icon="\uf110"
namespace neopixelExtras {

    /**
     * A Matrix made of ws2812b LEDs
     */
    export class Matrix {
        strip: neopixel.Strip
        substrip_length: number
        substrip_count: number
        pattern: stripPattern
        corner: startCorner
        direction: stripDirection
        //   y
        //   TL. .TR
        //   . . . .
        //   . . . .
        //   BL. .BR x


        isTopDown():   boolean {return this.isTopStart() && this.direction == stripDirection.X}
        isBotomUp():   boolean {return this.isBtmStart() && this.direction == stripDirection.X}
        isLeftRight(): boolean {return this.isLefStart() && this.direction == stripDirection.Y}
        isRightLeft(): boolean {return this.isRitStart() && this.direction == stripDirection.Y}

        isTopStart():  boolean {return this.corner == startCorner.TopLeft || this.corner == startCorner.TopRight}
        isBtmStart():  boolean {return this.corner == startCorner.BottomLeft || this.corner == startCorner.BottomRight}
        isLefStart():  boolean {return this.corner == startCorner.TopLeft || this.corner == startCorner.BottomLeft}
        isRitStart():  boolean {return this.corner == startCorner.TopRight || this.corner == startCorner.BottomRight}


        getPixel(x: number, y: number): number{
          var res = {
             full: x,
             rem: y
          }
          //var odd = this.direction == stripDirection.X
          //  ? (this.isBotomUp() y % 2 == 0) // X
          //  : (x % 2 == 0) // Y


          if (
            this.corner == startCorner.BottomRight && (
              this.pattern == stripPattern.loop ||
              (this.pattern == stripPattern.zigzag )
            )){
            res.rem *= -1
          }

//If BR|TR: res.full *= -1


          // BL / loop: x + y * Width
          // BR / loop: x + y * Width
          return 0
        }
        /**
         * Push all changes made to the framebuffer to the display
         */
        //% blockId="Matrix_show" block="%matrix| show"
        //% weight=90
        //% blockGap=8 parts="neopixelExtras"
        show(): void {
            this.strip.show();
        }
        /**
         * Set the brightness of the LEDs
         * @param setpoint -the brightness setpoint, on a scale from 0-255
         */
        //% blockId="Matrix_Brightness" block="%matrix set brightness to %setpoint"
        //% weight=80
        //% setpoint.defl=32
        //% blockGap=8 parts="neopixelExtras"
        Brightness(setpoint: number): void {
            this.strip.setBrightness(setpoint);
        }
        /**
         * Empty the entire framebuffer, a call to "show()" must be made to made changes visible
         */
        //% blockId="Matrix_clear" block="clear %matrix"
        //% weight=80
        //% blockGap=8 parts="neopixelExtras"
        clear(): void {
            this.strip.clear();
        }
        /**
         * Set a single pixel on the display to a specific colour
         * @param x - the position on the x-axis (left is 0)
         * @param y - the position on the y-axis (top is 0)
         * @param colour - the colour to set the pixel to
         */
        //% blockId="Matrix_setPixel" block="%matrix| set pixel at x %x| y %y| to colour %colour"
        //% weight=80
        //% colour.shadow=neopixel_colors
        //% blockGap=8 parts="neopixelExtras"
        setPixel(x: number, y: number, colour: number): void {
            this.strip.setPixelColor(this.getPixel(x,y), colour); } //While all odd rows are drawn bottom to top
        }


    /**
     * Create a new matrix object
     * @param strip the strp the matrix is made from
     * @param pattern the pattern followed
     * @param start the corner started in
     * @param matrixWidth the amount of leds horizontally
     */
    //% blockId="Matrix_Create" block="%strip| %pattern| from %start| every %matrixWidth pixels"
    //% weight=100
    //% matrixWidth.defl=18
    //% blockSetVariable=matrix
    //% blockGap=8 parts="neopixelExtras"
    //% start.shadow="startCorner"
    //% pattern.shadow="stripPattern"
    //% pattern.shadow="stripPattern
    //% start.fieldEditor="gridpicker"
    //% start.fieldOptions.width=220
    //% start.fieldOptions.columns=2
    //% inlineInputMode=inline
    export function create(strip: neopixel.Strip, pattern: stripPattern, start: startCorner, matrixWidth: number): Matrix {
        let matrix = new Matrix;
        matrix.strip   = strip;




        return matrix;
    }
    /**
     * Take in a string-character and return a bitmap to draw on the display
     */
    export function getLettermap(char: string): number[] {
        let letterMap: number[] = [0, 0, 0, 0, 0, 0, 0, 0]
        let offset = ((char.charCodeAt(0)) - 32); //Convert the ASCII-Character to it's code to generate the offset in the font-array
        if (offset >= 0) {
            for (let i = 0; i < 8; i++) {
                //Every character has 8 arguments in the array, so multiply the offset by 8, and then take ne next 8 arguments as the value for the correct bitmap.
                letterMap[i] = font8x6.getNumber(NumberFormat.UInt8BE, ((offset * 8) + i))
            }
        }
        return letterMap;
    }
}
const font8x6 = hex`
    0000000000000000 1038381010001000 6C6C480000000000 00287C28287C2800
    2038403008701000 64640810204C4C00 2050502054483400 3030200000000000
    1020202020201000 2010101010102000 0028387C38280000 0010107C10100000
    0000000000303020 0000007C00000000 0000000000303000 0004081020400000
    38444C5464443800 1030101010103800 3844041820407C00 3844043804443800
    081828487C080800 7C40407804443800 1820407844443800 7C04081020202000
    3844443844443800 3844443C04083000 0000303000303000 0000303000303020
    0810204020100800 00007C00007C0000 2010080408102000 3844041810001000
    38445C545C403800 384444447C444400 7844447844447800 3844404040443800
    7844444444447800 7C40407840407C00 7C40407840404000 3844405C44443C00
    4444447C44444400 3810101010103800 0404040444443800 4448506050484400
    4040404040407C00 446C544444444400 4464544C44444400 3844444444443800
    7844447840404000 3844444454483400 7844447848444400 3844403804443800
    7C10101010101000 4444444444443800 4444444444281000 4444545454542800
    4444281028444400 4444442810101000 7808102040407800 3820202020203800
    0040201008040000 3808080808083800 1028440000000000 00000000000000FC
    3030100000000000 000038043C443C00 4040784444447800 0000384440443800
    04043C4444443C00 0000384478403800 1820207820202000 00003C44443C0438
    4040704848484800 1000101010101800 0800180808084830 4040485060504800
    1010101010101800 0000685454444400 0000704848484800 0000384444443800
    0000784444447840 00003C4444443C04 0000582420207000 0000384038043800
    0020782020281000 0000484848582800 0000444444281000 00004444547C2800
    0000484830484800 0000484848381060 0000780830407800 1820206020201800
    1010100010101000 3008080C08083000 2850000000000000`;
