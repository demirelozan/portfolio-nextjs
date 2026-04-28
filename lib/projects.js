export const projects = [
  {
    id: 1,
    slug: "fragments",
    title: "Fragments (Kesit)",
    category: "film",
    year: "2025",
    description: "Original score for the award-winning short film Fragments, a socioeconomical and political standing from the eyes of the youth.",
    image: "/uploads/fragments.jpg",
    awards: ["Best Music - Athens Film Festival", "Official Selection"],
    link: "https://filmfreeway.com/Kesit_",
    wavFile: "/compositions/fragments/audio.wav",
    sheetFiles: ["/compositions/fragments/sheet.pdf"],
    sheetType: "pdf",
    featured: true
  },
  {
    id: 4,
    slug: "residues",
    title: "Residues",
    category: "concert",
    year: "2024",
    description: "Chamber composition for upright piano, two violins, viola, violoncello, and contrabass. An introspective piece exploring texture and silence.",
    image: "/compositions/residues/cover.jpg",
    awards: [],
    link: null,
    wavFile: "/compositions/residues/audio.wav",
    sheetFiles: ["/compositions/residues/Residues.pdf"],
    sheetType: "pdf",
    featured: false
  },
  {
    id: 2,
    slug: "the-interface",
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
    slug: "carbondale",
    title: "Carbondale",
    category: "film",
    year: "2023",
    description: "Atmospheric orchestral score for the short film Carbondale, for the narrative scene the train departs.",
    image: "/uploads/carbondale.jpeg",
    awards: [],
    link: "https://soundcloud.com/ozan-417880832/carbondale-short-film-soundtrack",
    // Uncomment to add audio + sheets:
    // wavFile: "/compositions/carbondale/audio.wav",
    // sheetFiles: ["/compositions/carbondale/sheet.pdf"],
    // sheetType: "pdf",
  }
]

export function getProjectBySlug(slug) {
  return projects.find(p => p.slug === slug) || null
}
