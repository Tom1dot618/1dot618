import { writable } from 'svelte/store'
import type { ITradeMessage } from '../Interfaces/Messages/ITradeMessage'
import NumberUtils from '../Utils/NumberUtils'

//--- interfaces
export interface IBubbleText {
    x: number
    y: number
    value: string
    style: string
    anchor: string
}

class Bubble {
    id: string
    x: number
    y: number
    radius: number
    velocity: number
    fillColor: string
    text: IBubbleText

    //--- private reactive property initialized in the getter
    _y$ = undefined

    //--- create a new bubble
    constructor(trade: ITradeMessage, width: number, height: number) {
        //-- initial values
        const radius = trade.size < 1000 ? 7 : (trade.size / 10000) * 10
        let velocity = 5
        let x = Math.random() * width
        let y = height
        let color = trade.side === 'Buy' ? 'darkgreen' : 'darkred'

        //--- keep space on both sides for the text
        const spacing = 100
        if (x - radius < 0) {
            x += x - radius + spacing
        } else if (x + radius > width) {
            x -= width - (x + radius) - spacing
        }

        //--- text
        let sizeDescription: string = trade.size.toString()
        let fontSize: string = '0.5'

        //--- font and velocity based on trade size
        if (trade.size >= 1000 * 1000) {
            sizeDescription =
                NumberUtils.removeZeroDecimal((trade.size / 1000) * 1000) + 'M'
            fontSize = '1.5'
            velocity = 1
        } else if (trade.size >= 100 * 1000) {
            sizeDescription =
                NumberUtils.removeZeroDecimal(trade.size / 1000) + 'K'
            fontSize = '1'
            velocity = 1.5
        } else if (trade.size >= 10 * 1000) {
            sizeDescription =
                NumberUtils.removeZeroDecimal(trade.size / 1000) + 'K'
            fontSize = '0.9'
            velocity = 2
        } else if (trade.size >= 1000) {
            sizeDescription =
                NumberUtils.removeZeroDecimal(trade.size / 1000) + 'K'
            fontSize = '.7'
            velocity = 2.5
        }

        //--- contruct the text object
        const bubbleText: IBubbleText = {
            x: trade.side === 'Buy' ? 0 : width - 30,
            y: height + radius,
            value: sizeDescription,
            style: `font-size: ${fontSize}em;`,
            anchor: trade.side === 'Buy' ? 'start' : 'end',
        }

        //--- construct the bubble object
        this.id = trade.trade_id
        this.x = x
        this.y = y
        this.radius = radius
        this.velocity = velocity
        this.fillColor = color
        this.text = bubbleText
    }

    moveUp() {
        this.y -= this.velocity
        this._y$.update(this.y)
    }

    //--- reactive property for y
    get y$(): number {
        if (this._y$ === undefined) {
            this._y$ = writable(this.y)
        }
        return this.y
    }
}

export default Bubble
