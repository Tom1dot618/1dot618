<script lang="ts">
    import type { OHLCV } from '../../Interfaces/Klines/IKline'

    export let ohlcvs: OHLCV[]

    console.log(ohlcvs)
</script>

<!-- <h3>{ohlcvs.date.toLocaleDateString()}</h3> -->
{#each ohlcvs as ohlcv}
    <div>{ohlcv.time}</div>
{/each}
