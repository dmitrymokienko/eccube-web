export const SidebarRandomContent = [
  {
    title: 'sidebar.banner-title1',
    description: 'sidebar.banner-description1',
  },
  {
    title: 'sidebar.banner-title2',
    description: 'sidebar.banner-description2',
  },
  {
    title: 'sidebar.banner-title3',
    description: 'sidebar.banner-description3',
  },
  {
    title: 'sidebar.banner-title4',
    description: 'sidebar.banner-description4',
  },
]

// function to get random number between 0 and 3
export function getRandomInt() {
  return Math.floor(Math.random() * 4)
}
