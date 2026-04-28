import HomePage from '../components/HomePage'
import { projects } from '../lib/projects'

const gallery = [
  {
    title: "Studio Session",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&h=500&fit=crop",
    description: "Recording session"
  },
  {
    title: "Live Performance",
    image: "https://i.imgur.com/JYoqcZb.jpeg",
    description: "Live performance"
  },
  {
    title: "Studio Setup",
    image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=1200&h=500&fit=crop",
    description: "My creative workspace"
  }
]

const settings = {
  title: "Ozan Demirel",
  profileImage: "https://i.imgur.com/scMnEuD.jpeg",
  bio: "Film & Media Composer",
  soundcloud: "https://soundcloud.com/ozan-417880832",
  instagram: "https://instagram.com/ozandemirl",
  email: "info@ozandemirel.me"
}

export default function Home() {
  return <HomePage projects={projects} gallery={gallery} settings={settings} />
}
