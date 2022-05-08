import { BybitRestEndPoint } from '../Exchanges/Bybit/Enums'
import type { IKline, OHLCV } from '../Interfaces/Klines/IKline'
import { DateUtils } from '../Utils/DateUtils'
import { FetchUtils } from '../Utils/FetchUtils'

class RestService {
    //--- curl https://api.bybit.com/v2/public/kline/list?symbol=BTCUSD&interval=30&limit=48&from=1581231260
    async getKlines(
        pair: string,
        interval: number,
        limit: number,
        fromTime: string
    ): Promise<OHLCV[]> {
        //--- construct url
        const url =
            FetchUtils.createRestUrl(BybitRestEndPoint.QueryKline) +
            `?symbol=${pair}&interval=${interval}&limit=${limit}&from=${DateUtils.toTimestamp(
                fromTime
            )}`

        const ohlcvs: OHLCV[] = []

        //--- fetch data
        try {
            const response = await fetch(url)

            if (response.status !== 200) {
                throw new Error(
                    `Failed to fetch data from ${url} with status ${response.status}`
                )
            }

            const json = await response.json()
            const items = json.result

            if (items !== null) {
                items.forEach((item: IKline) => {
                    ohlcvs.push({
                        time: DateUtils.toYyyyMmDdString(item.open_time),
                        open: item.open,
                        high: item.high,
                        low: item.low,
                        close: item.close,
                        volume: item.volume,
                    })
                })
            }

            return ohlcvs
        } catch (error) {
            console.log(`Error: ${error}`)
            return []
        }

        return []
    }

    async getDailyTpos(pair: string, date: Date): Promise<OHLCV[]> {
        return await this.getKlines(pair, 30, 47, date.toDateString())
    }
}

export default new RestService()
