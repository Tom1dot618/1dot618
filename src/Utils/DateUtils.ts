export class DateUtils {
    //--- convert date to unix timestamp
    //---'mm-dd-yyyy hh:mm:ss'
    static toTimestamp(date: string): number {
        return Date.parse(date) / 1000
    }

    static toISOstring(timestamp: number): string {
        return new Date(timestamp * 1000).toISOString()
    }

    static toYyyyMmDdString(timestamp: number): string {
        const date = new Date(timestamp * 1000).toISOString()
        return `${date.substring(0, 4)}-${date.substring(
            5,
            7
        )}-${date.substring(8, 10)} ${date.substring(11, 19)}`
    }
}
