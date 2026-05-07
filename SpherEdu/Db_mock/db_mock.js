const DB = {
       usuario: [
        { idusuario: 1, login: "Admin Geral", email: "admin@spheredu.com", senha: "admin123", telefone: "123456789", tipo_usuario: "superadmin" },
        { idusuario: 2, login: "Coordenador Daniel", email: "daniel.coord@spheredu.com", senha: "daniel123", telefone: "111111111", tipo_usuario: "coordenador" },
        { idusuario: 3, login: "Aluno Fernando", email: "fernando@spheredu.com", senha: "fernando", telefone: "222222222", tipo_usuario: "aluno" },
        { idusuario: 4, login: "Aluno Rose", email: "rose@spheredu.com", senha: "rose123", telefone: "333333333", tipo_usuario: "aluno" },
        { idusuario: 5, login: "Aluno Ian", email: "ian@spheredu.com", senha: "ian123", telefone: "444444444", tipo_usuario: "aluno" },
        { idusuario: 6, login: "Coordenador Sabrina", email: "sabrina.coord@spheredu.com", senha: "sabrina123", telefone: "555555555", tipo_usuario: "coordenador" },
        { idusuario: 7, login: "Aluno Vidah", email: "vidah@spheredu.com", senha: "vidah123", telefone: "666666666", tipo_usuario: "aluno" }
    ],

    superadmin: [
        { idSuperAdmin: 1, nome: "Admin Geral", usuario_idusuario: 1 }
    ],

    coordenador: [
        { idCoordenador: 1, nome: "Daniel Silva", usuario_idusuario: 2, telefone: "111111111", email: "daniel.coord@spheredu.com" },
        { idCoordenador: 2, nome: "Sabrina Silva", usuario_idusuario: 6, telefone: "555555555", email: "sabrina.coord@spheredu.com" }
    ],

    aluno: [
        { matricula: 1001, nome: "Fernando Alves", dataEntrada: "2024-02-15", cargaHorariaAcumulada: 20, usuario_idusuario: 3 },
        { matricula: 1002, nome: "Rose Vitoria", dataEntrada: "2024-03-01", cargaHorariaAcumulada: 10, usuario_idusuario: 4 },
        { matricula: 1003, nome: "Ian Silva", dataEntrada: "2024-02-20", cargaHorariaAcumulada: 5, usuario_idusuario: 5 },
        { matricula: 1004, nome: "Vidah Coutinho", dataEntrada: "2024-03-20", cargaHorariaAcumulada: 10, usuario_idusuario: 7 }
    ],

    curso: [
        { idCurso: 5, nome: "ADS", tipoCurso: "EAD", cargaHorariaTotal: 150, categoria: "Pós-graduação", turno: "Tarde" },
        { idCurso: 6, nome: "Gastronomia", tipoCurso: "Presencial", cargaHorariaTotal: 150, categoria: "Pós-graduação", turno: "Noite" },
        { idCurso: 7, nome: "Moda", tipoCurso: "Presencial", cargaHorariaTotal: 100, categoria: "Pós-graduação", turno: "Manha" }
    ],

    aluno_curso: [
        { aluno_matricula: 1001, curso_idCurso: 5 },
        { aluno_matricula: 1002, curso_idCurso: 5 },
        { aluno_matricula: 1002, curso_idCurso: 6 },
        { aluno_matricula: 1003, curso_idCurso: 6 },
        { aluno_matricula: 1004, curso_idCurso: 7 }
    ],

    coordenador_curso: [
        { coordenador_idCoordenador: 1, curso_idCurso: 5 },
        { coordenador_idCoordenador: 1, curso_idCurso: 6 },
        { coordenador_idCoordenador: 2, curso_idCurso: 7 }
    ],

    regrasdocurso: [
        { idRegra: 1, curso_idCurso: 5, categoria: "Cursos", cargaHorariaMin: 0, cargaHorariaMax: 150, cargaHorariaPermitida: 50, descricao: "Certificado do conclusão" },
        { idRegra: 2, curso_idCurso: 5, categoria: "Atividades acadêmicas", cargaHorariaMin: 0, cargaHorariaMax: 150, cargaHorariaPermitida: 50, descricao: "Certificado de participação" },
        { idRegra: 3, curso_idCurso: 5, categoria: "Palestras", cargaHorariaMin: 0, cargaHorariaMax: 150, cargaHorariaPermitida: 50, descricao: "Certificado de participação" },
        { idRegra: 4, curso_idCurso: 7, categoria: "Palestras", cargaHorariaMin: 0, cargaHorariaMax: 100, cargaHorariaPermitida: 50, descricao: "Certificado de participação" }
    ],

    atividadecomplementar: [
        { idAtividade: 50, codigo: "AC-001", titulo: "Curso de Python", descricao: "Certificado do conclusão", cargaHorariaSolicitada: 20, aluno_matricula: 1001, regra_idRegra: 1 },
        { idAtividade: 51, codigo: "AC-002", titulo: "Palestra IA", descricao: "Certificado de participação", cargaHorariaSolicitada: 5, aluno_matricula: 1002, regra_idRegra: 3 },
        { idAtividade: 52, codigo: "AC-003", titulo: "Palestra de moda", descricao: "Certificado de participação", cargaHorariaSolicitada: 5, aluno_matricula: 1004, regra_idRegra: 4 }
    ],

    submissao: [
        { idSubmissao: 80, atividade_idAtividade: 50, coordenador_idCoordenador: 1, dataEnvio: "2026-05-01 10:00:00", status: "pendente", observacao: "" },
        { idSubmissao: 81, atividade_idAtividade: 51, coordenador_idCoordenador: 1, dataEnvio: "2026-05-02 14:20:00", status: "aprovada", observacao: "Atividade válida e bem documentada." },
        { idSubmissao: 82, atividade_idAtividade: 52, coordenador_idCoordenador: 2, dataEnvio: "2026-06-01 11:30:00", status: "pendente", observacao: "" }
    ],

    certificado: [
        { idCertificado: 1, submissao_idSubmissao: 80, nomeArquivo: "Certificado.png", caminhoArquivo: "../../certificados/Certificado.png", textoOCR: "Certificado de conclusão de Python para Fernando Alves..." },
        { idCertificado: 2, submissao_idSubmissao: 81, nomeArquivo: "Rose_Vitoria.png", caminhoArquivo: "../../certificados/Rose_Vitoria.png", textoOCR: "Participação Rose Vitoria na palestra de IA..." },
        { idCertificado: 3, submissao_idSubmissao: 82, nomeArquivo: "Vidah_Maria.png", caminhoArquivo: "../../certificados/Vidah_Maria.png", textoOCR: "Participação Vidah Coutinho na palestra de moda..." }
    ],

    notificacao_email: [
        { idNotificacao: 1, submissao_idSubmissao: 80, destinatario: "fernando@spheredu.com", assunto: "Sua submissão foi recebida", dataEnvio: "2026-05-01 10:00:00" },
        { idNotificacao: 2, submissao_idSubmissao: 81, destinatario: "rose@spheredu.com", assunto: "Sua submissão foi aprovada", dataEnvio: "2026-05-02 14:20:00" },
        { idNotificacao: 3, submissao_idSubmissao: 82, destinatario: "vidah@spheredu.com", assunto: "Sua submissão foi recebida", dataEnvio: "2026-06-01 11:30:00" }
    ]
};