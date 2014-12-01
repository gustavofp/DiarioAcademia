﻿using NDDigital.DiarioAcademia.Dominio.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NDDigital.DiarioAcademia.Dominio
{
    public class Aluno : Entity
    {
        private Aluno() { Presencas = new List<Presenca>(); }

        public Aluno(string nome, Turma turma) : this()
        {
            this.Nome = nome;
            this.Turma = turma;            
        }        

        public string Nome { get; set; }

        public virtual Turma Turma { get; set; }

        public virtual List<Presenca> Presencas { get; set; }
        
        public int ObtemQuantidadePresencas()
        {
            return Presencas.Count(x => x.StatusPresenca == "C");
        }

        public int ObtemQuantidadeAusencias() 
        {
            return Presencas.Count(x => x.StatusPresenca == "F");
        }

        public void RegistraPresenca(Aula aula, string statusPresenca)
        {
            Presenca presenca = Presencas.FirstOrDefault(x => x.Aula.Equals(aula));

            if (presenca == null)
            {
                presenca = new Presenca(aula, this, statusPresenca);

                Presencas.Add(presenca);
            }
            else
            {
                presenca.StatusPresenca = statusPresenca;
            }
        }

        public override string ToString()
        {
            return string.Format("{0}: Presenças: {1}, Faltas: {2}", Nome, ObtemQuantidadePresencas(), ObtemQuantidadeAusencias());
        }        
    }

    public interface IAlunoRepository : IRepository<Aluno>
    {
        IEnumerable<Aluno> GetAllByTurma(int ano);        
    }

}