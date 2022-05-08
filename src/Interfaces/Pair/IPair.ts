import type { ILeverageFilter } from './ILeverageFilter'
import type { ILotSizeFilter } from './ILotSizeFilter'
import type { IPriceFilter } from './IPriceFilter'

export interface IPair {
    name: string
    alias: string
    status: string
    base_currency: string
    quote_currency: string
    price_scale: number
    taker_fee: string
    maker_fee: string
    funding_interval: number
    leverage_filter: ILeverageFilter
    price_filter: IPriceFilter
    lot_size_filter: ILotSizeFilter
}
