<script>
    import { CrosshairMode } from 'lightweight-charts'
    import Chart from 'svelte-lightweight-charts/components/chart.svelte'
    import CandlestickSeries from 'svelte-lightweight-charts/components/candlestick-series.svelte'
    import RestService from '../Services/RestService'
    const options = {
        width: 800,
        height: 300,
        layout: {
            backgroundColor: '#1c1d32',
            textColor: 'rgba(255, 255, 255, 0.9)',
        },
        grid: {
            vertLines: {
                color: '#1c1d32',
            },
            horzLines: {
                color: '#1c1d32',
            },
        },
        crosshair: {
            mode: CrosshairMode.Normal,
        },
        rightPriceScale: {
            borderColor: '#1c1d32',
        },
        timeScale: {
            borderColor: '#1c1d32',
        },
    }

    let klinesPromise = RestService.getKlines(
        'BTCUSD',
        30,
        200,
        '01-05-2022 00:00:00'
    )
</script>

<h1>Candlestick Chart</h1>
{#await klinesPromise}
    <div>LOADING...</div>
{:then ohlc}
    <Chart {...options}>
        <CandlestickSeries
            data={ohlc}
            upColor="blue"
            downColor="orange"
            borderDownColor="orange"
            borderUpColor="darkblue"
            wickDownColor="orange"
            wickUpColor="darkblue"
        />
    </Chart>
{/await}

<!-- 
<CandlestickSeries
        {data}
        upColor="rgba(255, 144, 0, 1)"
        downColor="#000"
        borderDownColor="rgba(255, 144, 0, 1)"
        borderUpColor="rgba(255, 144, 0, 1)"
        wickDownColor="rgba(255, 144, 0, 1)"
        wickUpColor="rgba(255, 144, 0, 1)"
    />
 -->
