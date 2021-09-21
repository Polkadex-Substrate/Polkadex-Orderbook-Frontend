type Props = {
  title: string
  href?: string
  color?: 'red' | 'green' | 'white' | 'black'
  size?: 'Small' | 'Medium' | 'Large'
  action?: () => void | undefined
  arrowIcon?: boolean
}

export default Props
