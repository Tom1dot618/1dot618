<!-- Chart -->
<script lang="ts">
    import type {
        IDailyKline,
        IKeyedKline,
    } from '../../Interfaces/Klines/IKline'
    import Candle from './Candle.svelte'

    export let daily: IDailyKline

    const height: number =
        daily.high > daily.low ? daily.high - daily.low : daily.low - daily.high
    const width: number = height
</script>

<svg width="100%" viewBox="0 0 {width} {height}">
    {#each daily.candles as candle (candle.id)}
        <!-- <Candle {candle} {daily} {width} {height} /> -->
    {/each}
</svg>
