/**
 * data.js – Mock data local para desenvolvimento.
 * TODO: substituir por chamadas reais à API quando o backend estiver conectado.
 * Base URL da API: import do api.js
 */

const MOCK = {
  stats: {
    cursos: 12,
    coordenadores: 15,
    solicitacoes: 2840,
    taxaAprovacao: '78.4%'
  },

  dashboard: {
    barras: [
      { label: 'Sistemas', valor: 11 },
      { label: 'Direito',  valor: 34 },
      { label: 'Civil',    valor: 56, highlight: true },
      { label: 'ADM',      valor: 19 },
      { label: 'Enferm.',  valor: 21 },
      { label: 'Software', valor: 9  }
    ],
    alertas: [
      { curso: 'Eng. Civil', tempo: '18 dias', status: 'Crítico' },
      { curso: 'Direito',    tempo: '12 dias', status: 'Atenção' },
      { curso: 'Sistemas',   tempo: '3 dias',  status: 'OK' }
    ]
  },

  cursos: [
    { id: 1, nome: 'Sistemas de Informação',  modalidade: 'Presencial', coordenador: 'Dr. Carlos Souza',    horas: 40, alunos: 450 },
    { id: 2, nome: 'Engenharia de Software',   modalidade: 'Híbrido',    coordenador: 'Dra. Ana Paula Cruz', horas: 60, alunos: 280 },
    { id: 3, nome: 'Direito',                  modalidade: 'Presencial', coordenador: 'Prof. Luís Pereira',  horas: 50, alunos: 600 },
    { id: 4, nome: 'Engenharia Civil',          modalidade: 'Presencial', coordenador: 'Dr. Marcos Lima',    horas: 55, alunos: 520 },
    { id: 5, nome: 'Análise e Dev. de Sistemas',modalidade: 'EAD',        coordenador: 'Profa. Clara Reis',  horas: 45, alunos: 310 }
  ],

  coordenadores: [
    { id: 1, nome: 'Dr. Ricardo Silva',  curso: 'Sistemas de Informação', email: 'ricardo@spheredu.com', ra: '123456', status: 'Ativo'  },
    { id: 2, nome: 'Dra. Helena Costa',  curso: 'Engenharia Civil',        email: 'helena@spheredu.com',  ra: '789012', status: 'Ativo'  },
    { id: 3, nome: 'Carlos Mendes',       curso: 'Direito',                 email: 'carlos@spheredu.com',  ra: '345678', status: 'Licença'},
    { id: 4, nome: 'Profa. Ana Ribeiro',  curso: 'Engenharia de Software',  email: 'ana@spheredu.com',     ra: '654321', status: 'Ativo'  }
  ],

  logs: [
    { datetime: '14/04/2026 14:20', responsavel: 'Dr. Ricardo Silva', evento: 'Mudança de Regra', descricao: 'Alteração de limite de horas em "Extensão" para 60h', ip: '192.168.1.12', nivel: 'Crítico'  },
    { datetime: '14/04/2026 13:05', responsavel: 'Dra. Helena Costa',  evento: 'Aprovação',       descricao: 'Aprovado certificado de 20h (Aluno ID #29)',          ip: '10.0.0.54',   nivel: 'Info'     },
    { datetime: '14/04/2026 11:45', responsavel: 'Carlos Mendes',       evento: 'Reprovação',      descricao: 'Reprovado certificado (Documento ilegível)',          ip: '189.10.5.2',  nivel: 'Aviso'    },
    { datetime: '13/04/2026 09:10', responsavel: 'Dr. Ricardo Silva',   evento: 'Login',           descricao: 'Login no sistema',                                   ip: '192.168.1.12',nivel: 'Info'     },
    { datetime: '12/04/2026 16:30', responsavel: 'Admin Sistema',       evento: 'Mudança de Regra','descricao': 'Novo curso "Engenharia de Software" adicionado',    ip: '10.0.0.1',    nivel: 'Crítico'  }
  ]
};
