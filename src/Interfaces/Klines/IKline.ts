export interface IKline {
    symbol: string
    interval: number
    open_time: number
    open: number
    high: number
    low: number
    close: number
    volume: number
    turnover: number
}

export interface OHLCV {
    time: string
    open: number
    high: number
    low: number
    close: number
    volume: number
}
