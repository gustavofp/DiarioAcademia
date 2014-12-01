﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NDDigital.DiarioAcademia.Aplicacao.DTOs
{
    public class TurmaDTO
    {        
        public TurmaDTO()
        {
        }

        public TurmaDTO(int id)
        {
            // TODO: Complete member initialization
            this.Id = id;
        }

        public TurmaDTO(Dominio.Turma turma)
        {
            Id = turma.Id;
            Ano = turma.Ano;
        }

        public int Id { get; set; }

        public override bool Equals(object obj)
        {
            var turma = obj as TurmaDTO;

            if (turma == null)
                return false;

            return this.Id == turma.Id;
        }

        public int Ano { get; set; }

        public override string ToString()
        {
            return "Academia do Programador " + Ano;
        }
    }
}