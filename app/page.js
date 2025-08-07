import HomePage from '../components/HomePage'

// Dummy data for now
const projects = [
  {
    id: 1,
    title: "Your First Film",
    category: "film",
    year: "2024",
    description: "Add your project description here",
    image: "/uploads/project1.jpg",
    awards: ["Best Score"],
    link: "#",
    soundcloud: "123456789"
  }
]

const gallery = [
  {
    title: "Studio Session",
    image: "/uploads/gallery1.jpg",
    description: "Recording session"
  }
]

const settings = {
  title: "Ozan Demirel",
  profileImage: "https://i.imgur.com/Kxi8Kyi.jpg",
  bio: "Film & Media Composer",
  soundcloud: "https://soundcloud.com/ozan-417880832",
  instagram: "https://instagram.com/ozandemirl",
  email: "info@ozandemirel.me"
}

export default function Home() {
  return <HomePage projects={projects} gallery={gallery} settings={settings} />
}