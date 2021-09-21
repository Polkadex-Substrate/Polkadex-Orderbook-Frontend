type IDefaultTokenInfo = {
  id?: number
  name?: string
  symbol?: string
  slug?: string
  last_updated?: Date
  periods?: {
    all_time: {
      open_timestamp: Date
      high_timestamp: Date
      low_timestamp: Date
      close_timestamp: Date
      quote: {
        USD: {
          open: number
          open_timestamp: Date
          high: number
          high_timestamp: Date
          low: number
          low_timestamp: Date
          close: number
          close_timestamp: Date
          percent_change: number,
          price_change: number
        }
      }
    }
  }
}
export default IDefaultTokenInfo
