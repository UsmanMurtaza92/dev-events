export type EventItem = {
  image: string
  title: string
  slug: string
  location: string
  date: string // YYYY-MM-DD
  time: string // human readable
}

export const events: EventItem[] = [
  {
    image: '/images/event1.png',
    title: 'Dev Summit 2025',
    slug: 'dev-summit-2025',
    location: 'San Francisco, CA',
    date: '2025-04-12',
    time: '09:00 - 17:00'
  },
  {
    image: '/images/event2.png',
    title: 'React Conf London',
    slug: 'react-conf-london-2025',
    location: 'London, UK',
    date: '2025-05-03',
    time: '10:00 - 18:00'
  },
  {
    image: '/images/event3.png',
    title: 'JS Hackathon NYC',
    slug: 'js-hackathon-nyc-2025',
    location: 'New York, NY',
    date: '2025-06-21',
    time: '18:00 - 02:00'
  },
  {
    image: '/images/event4.png',
    title: 'Cloud Native Meetup',
    slug: 'cloud-native-meetup-sf',
    location: 'San Francisco, CA',
    date: '2025-07-10',
    time: '18:30 - 20:30'
  },
  {
    image: '/images/event5.png',
    title: 'AI & ML Conference Berlin',
    slug: 'ai-ml-conference-berlin-2025',
    location: 'Berlin, Germany',
    date: '2025-09-15',
    time: '09:30 - 17:30'
  }
];