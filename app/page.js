import HomePage from '../components/HomePage'

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
    link: "https://vimeo.com/1148621700",
    // Place your files at:
    //   public/compositions/fragments/audio.wav
    //   public/compositions/fragments/sheet.pdf
    sheetType: "pdf",
    featured: true
  },
  // Residues — standalone concert piece
  {
    id: 4,
    title: "Residues",
    category: "concert",
    year: "2026",
    description: "Chamber composition for upright piano, two violins, viola, violoncello, and contrabass. An introspective piece exploring texture and silence.",
    // Place your cover image at: public/compositions/residues/cover.jpg
    // (export page 1 of the PDF as a JPG and put it here)
    image: "/compositions/residues/cover.jpg",
    awards: [],
    link: null,
    // Place your files at:
    //   public/compositions/residues/Residues.wav
    //   public/compositions/residues/Residues.pdf
    wavFile: "/compositions/residues/Residues.wav",
    sheetFiles: ["/compositions/residues/Residues.pdf"],
    sheetType: "pdf",
    featured: false
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
  },
  {
    id: 3,
    title: "Carbondale",
    category: "film",
    year: "2023",
    description: "Atmospheric orchestral score for the short film Carbondale, for the narrative scene the train departs.",
    image: "/uploads/carbondale.jpeg",
    awards: [],
    link: "https://soundcloud.com/ozan-417880832/carbondale-short-film-soundtrack",
    // Uncomment to add audio + sheets here too:
    // wavFile: "/compositions/carbondale/audio.wav",
    // sheetFiles: ["/compositions/carbondale/sheet.pdf"],
    // sheetType: "pdf",
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
