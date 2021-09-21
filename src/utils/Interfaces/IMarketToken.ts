type Platform = {
  id?: number
  name?: string
  slug?: string
  token_address?: string
}
type IMarketToken = {
  id?: number
  name?: string
  symbol?: string
  slug?: string
  num_market_pairs?: number
  date_added?: string
  tags?: string[]
  max_supply?: number
  circulating_supply?: number
  total_supply?: number
  platform?: Platform
  cmc_rank?: number
  last_updated?: string
  quote?: {
    USD?: {
      price?: number
      volume_24h?: number
      percent_change_1h?: number
      percent_change_24h?: number
      percent_change_7d?: number
      marketCap?: number
      lastUpdated?: string
    }
  }
}

export default IMarketToken
