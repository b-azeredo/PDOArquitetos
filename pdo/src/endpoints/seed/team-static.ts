export interface TeamMember {
  id: string
  name: string
  role: string
  description: string
  image: string
}

export const teamStatic: TeamMember[] = [
  {
    id: 'pedro-do-o',
    name: 'Pedro do Ó',
    role: 'Founder & Lead Architect',
    description:
      'Pedro leads the studio with 15+ years of experience designing and executing residential spaces that feel like home.',
    image: '/pedro.jpg',
  },
  {
    id: 'ana-martins',
    name: 'Ana Martins',
    role: 'Project Manager',
    description:
      'Ana ensures timelines, budgets, and construction standards are met with professionalism.',
    image: '/ana.jpg',
  },
  {
    id: 'joao-pereira',
    name: 'João Pereira',
    role: 'Senior Architect',
    description: 'Specialized in sustainable design and modern Portuguese architecture.',
    image: '/joao.jpg',
  },
]
