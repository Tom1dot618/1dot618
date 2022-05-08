<script lang="ts">
    import {
        BybitEndPointUrl,
        BybitRestEndPoint,
        ByBitStreamTopics,
    } from '../Exchanges/Bybit/Enums'
    import { DEBUG, pairs, subscriptions } from '../Stores/DataStore'

    import StreamService from '../Services/StreamService'
    import { FetchUtils } from '../Utils/FetchUtils'

    import MarketOrdersWidget from './MarketOrders/MarketOrdersWidget.svelte'
    import type { ITradeMessage } from '../Interfaces/Messages/ITradeMessage'
    import type { IPair } from '../Interfaces/Pair/IPair'

    import Subscription from '../Models/Subscription/Subscription'
    import type Message from '../Models/Subscription/Message'
    import Bubble from '../Models/Bubble'
    import RestService from '../Services/RestService'
    import Chart from './Candles/Chart.svelte'

    const width: number = 1000
    const height: number = 1618

    //--- fetch all trading pairs from Bybit
    async function getTradingPairs(): Promise<boolean> {
        const response = await fetch(
            FetchUtils.createRestUrl(BybitRestEndPoint.QuerySymbols)
        )
        const json = await response.json()
        const items = json.result

        items.forEach((item) => {
            $pairs.push(item)

            //--- TEST SUBSCRIBE ONLY TO SOME SPECIFIC PAIRS
            if (
                item.name === 'BTCUSD' ||
                item.name === 'ETHUSD'
                // item.name === "DOTUSD" ||
                // item.name === "LUNAUSD"
            ) {
                const subscription = new Subscription(
                    item,
                    ByBitStreamTopics.Trade
                )
                $subscriptions.push(subscription)

                const timer = setInterval(() => {
                    const maxBubbleRadius = 200
                    subscription.bubbles
                        .filter((bubble) => {
                            return bubble.y > maxBubbleRadius * -1
                        })
                        .map((bubble) => {
                            bubble.y -= 1
                            bubble.text.y -= bubble.velocity
                        }, maxBubbleRadius * -1)
                    //subscription.bubbles = subscription.bubbles;
                }, 100)
                return () => clearInterval(timer)
            }
        })

        $pairs = $pairs
        $subscriptions = $subscriptions

        let streamService = new StreamService(
            BybitEndPointUrl.MainnetStreamInversePerpetual,
            $subscriptions,
            onMessage
        )

        return true
    }

    //--- set promise to fetch trading pairs
    //--- rendering awaits for this promise to resolve
    let tradingPairsPromise = getTradingPairs()
    let klinesPromise = RestService.getKlines(
        'BTCUSD',
        30,
        47,
        '05-04-2022 00:00:00'
    )

    //--- callback for stream messages
    const onMessage = (message: Message) => {
        //--- trade message
        if (message.isTrade) {
            //--- add all the trades in the message to the store
            message.data.forEach((trade: ITradeMessage) => {
                //if ($DEBUG) console.log(trade);

                //--- find subscription forr the pair given by the message
                const subscription = $subscriptions.find(
                    (subscription) => subscription.pair.name === trade.symbol
                )
                if (subscription === undefined) return

                //if ($DEBUG) console.log(subscription);

                //--- add trade & bubble
                subscription.trades.push(trade)
                subscription.bubbles.push(new Bubble(trade, width, height))
            })

            //--- necesarry to trigger the svelte reactivity
            $subscriptions = $subscriptions
        }
        //--- level 2 orderbook message
        else if (message.isOrderbookLevel2) {
            //TODO
        }
    }
</script>

<main>
    <!--     {#await tradingPairsPromise}
        <div>LOADING...</div>
    {:then}
        <div class="container">
            <LayoutGrid>
                {#each $subscriptions as subscription}
                    <Cell>
                        <MarketOrdersWidget {subscription} {width} {height} />
                    </Cell>
                {/each}
            </LayoutGrid>
        </div>
    {/await}
 -->
    {#await klinesPromise}
        <div>LOADING...</div>
    {:then daily}
        <div class="container">
            <Chart {daily} />
        </div>
    {/await}
</main>

<style>
    .container {
        margin: 0rem;
    }

    main {
        margin: 2rem;
    }
</style>
