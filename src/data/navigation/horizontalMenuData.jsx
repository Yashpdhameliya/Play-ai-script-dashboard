const horizontalMenuData = () => [
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
        label: 'Create',
        href: '/bot-agent/create'
      },
      {
        label: 'My Agents',
        href: '/bot-agent/my-agents'
      }
    ],
    icon: 'ri-robot-line'
  }
]
export default horizontalMenuData
