using FI.AtividadeEntrevista.DAL.Beneficiarios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {

        public long Incluir(DML.Beneficiario beneficiario)
        {
            DaoBeneficiario benef = new DaoBeneficiario();
            return benef.Incluir(beneficiario);
        }

        public void Alterar(DML.Beneficiario beneficiario)
        {
            DaoBeneficiario benef = new DaoBeneficiario();
            benef.Alterar(beneficiario);
        }

        public List<DML.Beneficiario> Listar(long idCliente)
        {
            DaoBeneficiario benef = new DaoBeneficiario();
            return benef.Listar(idCliente);
        }

        public void Excluir(long id)
        {
            DaoBeneficiario benef = new DaoBeneficiario();
            benef.Excluir(id);
        }
        public void ExcluirVarios(long idCliente)
        {
            DaoBeneficiario benef = new DaoBeneficiario();
            benef.ExcluirVarios(idCliente);
        }

        public bool VerificarExistencia(string CPF, long idCliente)
        {
            DaoBeneficiario benef = new DaoBeneficiario();
            return benef.VerificarExistencia(CPF, idCliente);
        }
    }
}
