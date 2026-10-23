export const navLinks = [
  { href: '/personalizar/', label: 'Personalizar' },
  { href: '/blocos/', label: 'Blocos' },
  { href: '/restauracao/', label: 'Restauração' },
  { href: '/sobre/', label: 'Sobre' },
  { href: '/como-funciona/', label: 'Como funciona' },
] as const;

export const serviceCards = [
  {
    index: '01', title: 'Uma peça com suas escolhas',
    text: 'Conte o que imagina, escolha preferências e prepare uma conversa sobre o orçamento.',
    href: '/personalizar/', action: 'Personalizar uma peça'
  },
  {
    index: '02', title: 'Materiais para conhecer',
    text: 'Explore referências de blocos e possibilidades de acabamento. Consulte sempre a disponibilidade.',
    href: '/blocos/', action: 'Conhecer os blocos'
  },
  {
    index: '03', title: 'Uma história para preservar',
    text: 'Entenda como solicitar a avaliação de uma peça que precisa de atenção.',
    href: '/restauracao/', action: 'Entender a restauração'
  },
] as const;
