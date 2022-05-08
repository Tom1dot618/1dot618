<!-- Candle -->
<script lang="ts">
    import type {
        IDailyKline,
        IKeyedKline,
        IKline,
    } from '../../Interfaces/Klines/IKline'
    import { DateUtils } from '../../Utils/DateUtils'

    //export const daily: IDailyKline
    export let candle: IKeyedKline
    export let width: number
    export let height: number

    /*     console.log(DateUtils.toDate(candle.data.open_time))
    console.log(candle) */

    //--- candle width
    const candleSpace = width / 48
    const candleWidth = candleSpace * 0.8
    const candleMargin = candleSpace * 0.2

    //--- candle height
    let candleHeight = candle.data.open - candle.data.close
    if (candleHeight < 0) {
        candleHeight = -candleHeight
    }

    //--- candle position adjustment
    const positionAdjustment = 0.5

    //--- candle position
    let position = candle.data.open

    if (candle.data.open < candle.data.close) {
        position = candle.data.close
    }

    console.log(candle.id + ' / ' + width + ' / ' + height)
    console.log('------------------------------------------------')
    console.log('x:' + candle.id * (candleWidth + candleMargin))
    console.log('y:' + position)
    console.log('width:' + candleWidth)
    console.log('height:' + candleHeight)
    console.log('------------------------------------------------')
</script>

<rect
    x={candle.id * (candleWidth + candleMargin)}
    y={position}
    width={candleWidth}
    height={candleHeight}
    opacity="0.5"
/>
