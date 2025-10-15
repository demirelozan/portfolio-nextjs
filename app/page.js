import HomePage from '../components/HomePage'

// Updated projects data with your new additions
const projects = [
  // Featured project - Fragments (will appear first)
  {
    id: 1,
    title: "Fragments (Kesit)",
    category: "film",
    year: "2024",
    description: "Original score for the award-winning short film Fragments, a socioeconomical and political standing from the eyes of the youth.",
    image: "/uploads/fragments.jpg", // You'll upload this image
    awards: ["Best Music - Athens Film Festival", "Official Selection"],
    link: "https://filmfreeway.com/Kesit_",
    soundcloud: null,
    featured: true // This marks it as featured
  },
  {
    id: 2,
    title: "The Interface",
    category: "game",
    year: "2024",
    description: "Complete soundtrack for The Interface game, featuring atmospheric electronic compositions and dynamic adaptive music systems.",
    image: "/uploads/interface.jpg", // You'll upload this image
    awards: [],
    link: "https://soundcloud.com/ozan-417880832/sets/interface-game-soundtracks",
    soundcloud: null
  },
  {
    id: 3,
    title: "Carbondale",
    category: "film",
    year: "2024",
    description: "Atmosperic orchestral score for the short film Carbondale, for the narrative scene the train departs.",
    image: "/uploads/carbondale.jpg", // You'll upload this image
    awards: [],
    link: "https://soundcloud.com/ozan-417880832/carbondale-short-film-soundtrack",
    soundcloud: null
  }
]

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
