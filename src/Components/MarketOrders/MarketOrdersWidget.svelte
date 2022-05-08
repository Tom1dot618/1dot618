<!-- MarketOrdersWidget -->
<script lang="ts">
    import { subscriptions } from '../../Stores/DataStore'
    import BubbleList from '../Bubble/BubbleList.svelte'
    import MarketOrdersPairName from './MarketOrdersPairName.svelte'
    import MarketOrdersStatisticsLine from './MarketOrdersStatisticsLine.svelte'
    import NumberUtils from '../../Utils/NumberUtils'
    import type Subscription from '../../Models/Subscription/Subscription'

    export let subscription: Subscription
    export let width: number
    export let height: number
</script>

<!-- Card -->
<div class="card">
    <!-- header -->
    <MarketOrdersPairName
        baseCurrency={subscription.pair.base_currency}
        quoteCurrency={subscription.pair.quote_currency}
    />
    <!-- divider -->
    <hr />
    <!-- content -->

    <MarketOrdersStatisticsLine
        buy={NumberUtils.internationalizeNumber(subscription.numberOfBuys)}
        label="amount"
        sell={NumberUtils.internationalizeNumber(subscription.numberOfSells)}
    />
    <MarketOrdersStatisticsLine
        variant="big"
        buy={NumberUtils.financializeNumber(subscription.buyVolume)}
        label="volume"
        sell={NumberUtils.financializeNumber(subscription.sellVolume)}
    />
    <MarketOrdersStatisticsLine
        buy={NumberUtils.financializeNumber(subscription.averageBuyVolume)}
        label="average"
        sell={NumberUtils.financializeNumber(subscription.averageSellVolume)}
    />
    <div class="clear" />
    <!-- divider -->
    <hr />
    <!-- bubbles -->
    <BubbleList {width} {height} bubbles={subscription.bubbles} />
</div>

<style>
    .card {
        padding: 1rem;
        background-color: #02031b;
        border-radius: 0.5rem;
    }

    hr {
        border: 0;
        border-top: 1px solid #23232f;
    }
</style>
