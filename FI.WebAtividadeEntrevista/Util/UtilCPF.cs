using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAtividadeEntrevista.Util
{
    public class UtilCPF
    {

        public static bool ValidarCPF(string CPF)
        {
            string verifier = CPF.Split('-')[1];

            string verifier1 = CPFcounter(CPF.Split('-')[0], 10);
            string verifier2 = CPFcounter((CPF.Split('-')[0] + verifier1), 11);

            if (verifier == (verifier1 + verifier2))
                return true;
            return false;
        }
        public static string CPFcounter(string cpf, int decreaser)
        {
            int counter = 0;
            foreach (char item in cpf)
            {
                if (item != '.')
                {
                    counter += int.Parse(item.ToString()) * decreaser;
                    decreaser--;
                }
            }
            return ((counter * 10) % 11).ToString();
        }
    }
}