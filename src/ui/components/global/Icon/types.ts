type Props = {
  name: "Settings" | "Candles" | "Sun" | "Close" | "Graph" | "Options" | "Edit" | "Exchange" | "Expand" | "Help" | "History" | "News" | "Notifications" | "Order" | "OrderAsc" | "OrderDesc" | "Search" | "Star" | "Transactions" | "Wallet"
  size?: "XSmall" | "Small" | "Medium" | "Large",
  background?: "DarkGray" | "LightGray" | "None" | "Primary" | "Gray"
  action?: () => void | undefined
  text?: string
}

export default Props
