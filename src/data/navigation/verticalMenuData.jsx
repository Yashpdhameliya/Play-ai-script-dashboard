const verticalMenuData = () => [
  {
    label: 'Home',
    href: '/home',
    icon: 'ri-home-smile-line'
  },
  {
    label: 'About',
    href: '/about',
    icon: 'ri-information-line'
  },
  {
    label: 'Bot Agent',
    children: [
      {
        label: 'list',
        href: '/bot-agent/list'
      },
      {
        label: 'view',
        href: '/bot-agent/view'
      }
    ],
    icon: 'ri-robot-line'
  }
]

export default verticalMenuData
