#INCLUDE "PROTHEUS.CH"
#INCLUDE "FWMVCDEF.CH"

/*/{Protheus.doc} NB00001
	TELA CRUD COM A TABELA NB0 RESPONSAVEL PELO CADASTRO DE OCORRÊNCIAS DE CLIENTES DE ACORDO COM A CARGA
@type function
@author Carlos Batista
@since 27/08/2025
@version 1.0
/*/
USER FUNCTION NB00001()

Local cAlias := "NB0"
Local cTitulo := "Registro de Ocorrências"
Local cFunExc := "MODELEXCL"
Local cFunAlt := "MODELALTER"

AxCadastro( cAlias, cTitulo, cFunExc, cFunAlt ) //Função genérica para CRUD

RETURN

//-- Confirmação de exclusão
static function MODELEXCL()

Local lRet := MsgBox("Tem certeza que deseja excluir o registro?","Confirmação","YESNO")

RETURN lRet

//-- Confirmação de alteração
static function MODELALTER()

Local lRet := .F.
Local cMsg := ""

If INCLUI
    cMsg := "Confirma a inclusão do Registro?"
Else
    cMsg := "Confirma a alteração do Registro?"
EndIf

lRet := MsgBox(cMsg,"Confirmação","YESNO")

RETURN lRet
