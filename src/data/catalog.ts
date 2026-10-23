export type ReferenceMaterial = {
  id: 'claras' | 'escuras' | 'figuradas';
  title: string;
  description: string;
  note: string;
  illustration: 'light' | 'dark' | 'pattern';
};
export const references: ReferenceMaterial[] = [
  {id:'claras',title:'Tons claros',description:'Uma referência visual para conversar sobre tonalidades suaves e veios aparentes.',note:'Exemplo ilustrativo; espécie, tratamento e disponibilidade não verificados.',illustration:'light'},
  {id:'escuras',title:'Tons escuros',description:'Uma direção estética para quem prefere contraste e acabamento mais sóbrio.',note:'Exemplo ilustrativo; espécie, tratamento e disponibilidade não verificados.',illustration:'dark'},
  {id:'figuradas',title:'Padrões marcantes',description:'Formas e desenhos naturais podem variar de uma peça para outra.',note:'Exemplo ilustrativo; espécie, tratamento e disponibilidade não verificados.',illustration:'pattern'}
];
