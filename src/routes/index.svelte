<script lang="ts">
    import '../app.css'
    import Tpo from '../Components/Tpo/Tpo.svelte'
    import RestService from '../Services/RestService'
    import type { OHLCV } from '../Interfaces/Klines/IKline'

    const data: Array<OHLCV[]> = []

    async function fetchData(): Promise<Array<OHLCV[]>> {
        let from = new Date('2022-05-01T00:00:00')
        let to = new Date('2022-05-02T00:00:00')
        let promises: Promise<OHLCV[]>[] = []

        let date: Date = from
        while (date <= to) {
            promises.push(RestService.getDailyTpos('BTCUSD', date))
            date.setDate(date.getDate() + 1)
        }

        let ohlcvs = await Promise.all(promises)
        console.log(ohlcvs)
        return ohlcvs
    }

    const promise = fetchData()
</script>

<div class="container">
    <h1>1.618</h1>
    {#await promise}
        {#each data as item}
            <Tpo ohlcvs={item} />
        {/each}
    {/await}
</div>

<style>
    .container {
        margin: 1rem;
    }
</style>
