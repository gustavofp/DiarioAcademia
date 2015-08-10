﻿using NDDigital.DiarioAcademia.Dominio.Entities;
using System.Collections.Generic;

namespace NDDigital.DiarioAcademia.Dominio.Contracts
{
    public interface IAlunoRepository : IRepository<Aluno>
    {
        IList<Aluno> GetAllByTurma(int ano);

        IList<Aluno> GetAllByTurmaId(int id);
    }
}