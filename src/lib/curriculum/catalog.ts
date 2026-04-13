export type CatalogModule = {
  slug: string;
  title: string;
  summary: string;
};

export type CatalogCourse = {
  slug: string;
  title: string;
  level: 'básico' | 'intermedio';
  summary: string;
  estimatedHours: number;
  modules: CatalogModule[];
};

export type CatalogTrack = {
  slug: string;
  title: string;
  summary: string;
  courses: CatalogCourse[];
};

export const curriculumCatalog: CatalogTrack[] = [
  {
    slug: 'filosofia',
    title: 'Filosofía Griega Clásica',
    summary: '',
    courses: [
      {
        slug: 'presocraticos',
        title: 'Presocráticos',
        level: 'básico',
        summary: '',
        estimatedHours: 15,
        modules: [
          {
            slug: 'tales',
            title: 'Tales de Mileto',
            summary: '',
          },
          {
            slug: 'anaximandro',
            title: 'Anaximandro de Mileto',
            summary: '',
          },
          {
            slug: 'anaximenes',
            title: 'Anaxímenes de Mileto',
            summary: '',
          },
          {
            slug: 'jenofanes',
            title: 'Jenófanes de Colofón',
            summary: '',
          },
          {
            slug: 'pitagoras',
            title: 'Pitágoras de Samos',
            summary: '',
          },
          {
            slug: 'heraclito',
            title: 'Heráclito de Éfeso',
            summary: '',
          },
          {
            slug: 'parmenides',
            title: 'Parménides de Elea',
            summary: '',
          },
          {
            slug: 'zenon',
            title: 'Zenón de Elea',
            summary: '',
          },
          {
            slug: 'meliso',
            title: 'Meliso de Samos',
            summary: '',
          },
          {
            slug: 'atomistas',
            title: 'Los Atomistas: Leucipo y Demócrito',
            summary: '',
          },
          {
            slug: 'anaxagoras',
            title: 'Anaxágoras de Clazómenas',
            summary: '',
          },
          {
            slug: 'empedocles',
            title: 'Empédocles de Acragas',
            summary: '',
          },
          {
            slug: 'sofistas',
            title: 'Los Sofistas',
            summary: '',
          },
        ]
      },
      {
        slug: 'socrates',
        title: 'Sócrates',
        level: 'básico',
        summary: '',
        estimatedHours: 0,
        modules: [
          {
            slug: 'aristofanes',
            title: 'Según Aristófanes',
            summary: '',
          },
          {
            slug: 'jenofonte',
            title: 'Según Jenofónte',
            summary: '',
          },
          {
            slug: 'apologia',
            title: 'Apología',
            summary: '',
          },
          {
            slug: 'criton',
            title: 'Critón',
            summary: '',
          },
          {
            slug: 'eutifron',
            title: 'Eutifrón',
            summary: '',
          },
        ]
      },
      {
        slug: 'platon',
        title: 'Platón',
        level: 'básico',
        summary: '',
        estimatedHours: 0,
        modules: [
          {
            slug: 'contexto',
            title: 'Contexto Histórico',
            summary: '',
          },
          {
            slug: 'carmides',
            title: 'Cármides (Sophrosyne)',
            summary: '',
          },
          {
            slug: 'eutidemo',
            title: 'Eutidemo (Virtud)',
            summary: '',
          },
          {
            slug: 'gorgias',
            title: 'Gorgias (Justicia)',
            summary: '',
          },
          {
            slug: 'menon',
            title: 'Menón (Virtud / Recolección)',
            summary: '',
          },
          {
            slug: 'teeteto',
            title: 'Teeteto (Episteme)',
            summary: '',
          },
          {
            slug: 'politeia',
            title: 'La República (Politeia)',
            summary: '',
          },
          {
            slug: 'parmenides',
            title: 'Parménides (Formas / Ser)',
            summary: '',
          },
          {
            slug: 'sofista',
            title: 'Sofista (Ser)',
            summary: '',
          },
          {
            slug: 'cratilo',
            title: 'Crátilo (Etimología)',
            summary: '',
          },
          {
            slug: 'timeo',
            title: 'Timeo (Cosmos)',
            summary: '',
          },
          {
            slug: 'symposium',
            title: 'El Banquete (Symposium)',
            summary: '',
          },
          {
            slug: 'fedro',
            title: 'Fedro (Eros / Discursos)',
            summary: '',
          },
          {
            slug: 'lisis',
            title: 'Lisis (Philia)',
            summary: '',
          },
          {
            slug: 'ion',
            title: 'Ion (Inspiración Divina)',
            summary: '',
          },
        ]
      },
      {
        slug: 'aristoteles',
        title: 'Aristóteles',
        level: 'básico',
        summary: '',
        estimatedHours: 0,
        modules: [
          {
            slug: 'categorias',
            title: 'Categorías',
            summary: '',
          },
          {
            slug: 'interpretacion',
            title: 'Interpretación',
            summary: '',
          },
          {
            slug: 'analiticos',
            title: 'Analíticos Primeros Libro I',
            summary: '',
          },
          {
            slug: 'analiticos-ii',
            title: 'Analíticos Primeros Libro II',
            summary: '',
          },
          {
            slug: 'analiticos-iii',
            title: 'Analíticos Segundos Libro I',
            summary: '',
          },
        ]
      },
      {
        slug: 'misc',
        title: 'Misceláneo',
        level: 'básico',
        summary: '',
        estimatedHours: 0,
        modules: [
          {
            slug: 'lista',
            title: 'Lista de Palabras',
            summary: '',
          },
          {
            slug: 'letras',
            title: 'Alfabeto Griego',
            summary: '',
          },
          {
            slug: 'conceptos',
            title: 'Algunos Conceptos',
            summary: '',
          },
        ]
      },
    ]
  },
  {
    slug: 'literatura',
    title: 'Notas de Libros',
    summary: 'Notas que quiero conservar sobre algunoss libros.',
    courses: [
      {
        slug: 'novelas',
        title: 'Categoría: Novelas',
        level: 'básico',
        summary: 'Notas sobre algunas novelas.',
        estimatedHours: 0,
        modules: [
          {
            slug: 'kundera-levedad',
            title: 'La Insoportable Levedad del Ser',
            summary: 'Milan Kundera',
          },
          {
            slug: 'marquez-colera',
            title: 'El Amor en los Tiempos del Cólera',
            summary: 'Gabriel García Márquez',
          },
        ]
      }
    ]
  }
];
