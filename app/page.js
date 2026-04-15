import HomePage from '../components/HomePage'

// Updated projects data with your new additions
const projects = [
  // Featured project - Fragments 
  {
    id: 1,
    title: "Fragments (Kesit)",
    category: "film",
    year: "2025",
    description: "Original score for the award-winning short film Fragments, a socioeconomical and political standing from the eyes of the youth.",
    image: "/uploads/fragments.jpg",
    awards: ["Best Music - Athens Film Festival", "Official Selection"],
    link: "https://filmfreeway.com/Kesit_",
    // ── Add your files to public/compositions/fragments/ ──
    wavFile: "/compositions/fragments/audio.wav",       // your .wav file
    sheetFiles: ["/compositions/fragments/sheet.pdf"],  // PDF  — or use JPGs: ["sheet-p1.jpg","sheet-p2.jpg"]
    sheetType: "pdf",                                   // "pdf" or "jpg"
    featured: true
  },
  {
    id: 2,
    title: "The Interface",
    category: "game",
    year: "2022",
    description: "Complete soundtrack for The Interface game, featuring atmospheric electronic compositions and dynamic adaptive music systems.",
    image: "/uploads/interface.jpg", 
    awards: [],
    link: "https://soundcloud.com/ozan-417880832/sets/interface-game-soundtracks",
    soundcloud: null
  },
  {
    id: 3,
    title: "Carbondale",
    category: "film",
    year: "2023",
    description: "Atmosperic orchestral score for the short film Carbondale, for the narrative scene the train departs.",
    image: "/uploads/carbondale.jpeg",
    awards: [],
    link: "https://soundcloud.com/ozan-417880832/carbondale-short-film-soundtrack",
    // To add audio+sheets here too, uncomment and fill in:
    // wavFile: "/compositions/carbondale/audio.wav",
    // sheetFiles: ["/compositions/carbondale/sheet.pdf"],
    // sheetType: "pdf",
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
