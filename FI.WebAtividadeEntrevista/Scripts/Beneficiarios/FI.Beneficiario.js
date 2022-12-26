
$(document).ready(function () {
    
   
    

});

function BeneficiarioPost(idCliente) {

    var itens = []
    var dados = {}
    benefTableId.forEach(itemId => {
        dados = {
            "CPF": $('#cpf' + itemId).val(),
            "Nome": $('#nome' + itemId).val(),
            "IdCliente": idCliente,
        }
        itens.push(dados)
    })
    itens = JSON.stringify({ 'itens': itens });

    
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        url: urlBenefPost,
        method: 'POST',
        datatype: 'json',
        data : itens,
        error:
            function (r) {
                if (r.status == 406)
                    ModalDialog("CPF Inválido!", r.responseJSON);
                else if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
        success:
            function (r) {
                ModalDialog("Sucesso!", r)
            }
    });
}

function BeneficiariosGet(ClienteId) {
    $.ajax({
        url: urlBenefGet,
        method: "POST",
        data: {
            "clienteId": ClienteId,
        },
        error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
        success:
            function (r) {
                var benefs = r.beneficiarios
                benefs.forEach(beneficiario => {
                    AddTableBeneficiario(beneficiario.CPF, beneficiario.Nome);
                })
            }
    });
}

function AdicionarBenef() {

    if (!ValidarCPF($('#formBenef #CPF').val())) {
        ModalDialog('CPF Inválido!', 'O CPF inserido não é valido, por favor tente novamente.')

    } else if (!ValidarCPFRepetido($('#formBenef #CPF').val())) {
        ModalDialog('CPF ja foi cadastrado!', 'O CPF inserido ja foi cadastrado como beneficiario.')

    } else {
        AddTableBeneficiario($('#formBenef #CPF').val(), $('#formBenef #Nome').val())
    }

}
function AddTableBeneficiario(CPF, NOME) {
    var idnumber = ((Math.random() * 10000) + 1).toString().replace('.', '');
    benefTableId.push(idnumber)
    var texto =
        '  <tr id="' + idnumber + '">                                                                               ' +
        '      <th>                                                                                                ' +
        '         <input id="cpf' + idnumber + '" class="form-control" readonly value="' + CPF + '" />     ' +
        '      </th>                                                                                               ' +
        '      <th>                                                                                                ' +
        '         <input id="nome' + idnumber + '" class="form-control" readonly value="' + NOME + '" />   ' +
        '      </th>                                                                                               ' +
        '      <th>                                                                                                ' +
        `         <button onclick="AlterarBenef('${idnumber}')" type="button" class="btn btn-sm btn-primary">Alterar</button>                            ` +
        '      </th>                                                                                               ' +
        '      <th>                                                                                                ' +
        `         <button onclick="RemoverBenef('${idnumber}')" type="button" class="btn btn-sm btn-primary">Excluir</button>                           ` +
        '      </th>                                                                                               ' +
        '  </tr>                                                                                                   '


    $('#tbodyBeneficiados').append(texto);
    $('#formBenef')[0].reset();
}


function RemoverBenef(Idfield) {
    $('#' + Idfield).remove();
    RemoveBenefFromList(Idfield)
}
function AlterarBenef(Idfield) {
    $('#cpf' + Idfield).attr("readonly", false)
    $('#nome' + Idfield).attr("readonly", false)
    
    $('#formBenef #CPF').val($('#cpf' + Idfield).val())
    $('#formBenef #Nome').val($('#nome' + Idfield).val())

    $('#' + Idfield).remove();
    RemoveBenefFromList(Idfield)
}
function RemoveBenefFromList(IdField) {
    var FieldTostring = IdField.toString()
    var index = benefTableId.indexOf(FieldTostring)
    benefTableId.splice(index, 1)
}

function ValidarCPF(CPF) {
    var verifier = CPF.split('-')[1];

    var verifier1 = CPFcounter(CPF.split('-')[0], 10)
    var verifier2 = CPFcounter((CPF.split('-')[0] + verifier1), 11)
    
    if (verifier == (verifier1 + verifier2))
        return true

    return false
}
function ValidarCPFRepetido(atualCPF) {
    var valid = true;
    benefTableId.forEach(numeroId => {
        if (atualCPF === $('#cpf' + numeroId).val()) {
            valid = false;
        }
    })
    return valid;
}
function CPFcounter(cpf, decreaser) {
    var counter = 0
    for (var c = 0; c < cpf.length; c++) {
        if (cpf[c] != '.') {
            counter += parseInt(cpf[c]) * decreaser
            decreaser--
        }
    }
    var retorno = ((counter * 10) % 11).toString()
    return retorno;
}

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}
