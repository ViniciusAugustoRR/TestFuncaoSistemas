using FI.AtividadeEntrevista.BLL;
using FI.AtividadeEntrevista.DML;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebAtividadeEntrevista.Models;
using WebAtividadeEntrevista.Util;
using WebGrease.Activities;

namespace WebAtividadeEntrevista.Controllers
{
    public class BeneficiarioController : Controller
    {

        [HttpPost]
        public JsonResult Incluir(List<BeneficiarioModel> itens)
        {
            if (itens.Count < 0)
                return Json("Cadastro efetuado com sucesso");


            BoBeneficiario bo = new BoBeneficiario();
            bo.ExcluirVarios(itens[0].IdCliente);

            foreach (var benef in itens)
            {
                if (!this.ModelState.IsValid)
                {
                    List<string> erros = (from item in ModelState.Values
                                          from error in item.Errors
                                          select error.ErrorMessage).ToList();

                    Response.StatusCode = 400;
                    return Json(string.Join(Environment.NewLine, erros));
                }

                benef.Id = bo.Incluir(new Beneficiario()
                {
                    Nome = benef.Nome,
                    CPF= benef.CPF,
                    IdCliente= benef.IdCliente
                });
            }
            return Json("Cadastro efetuado com sucesso");
        }

        [HttpPost]
        public JsonResult Listar(long clienteId)
        {
            BoBeneficiario bo = new BoBeneficiario();
            try
            {
                var lista = bo.Listar(clienteId);
                return Json(new { beneficiarios = lista });
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
                return Json(ex.Message);
            }
        }


    }
}