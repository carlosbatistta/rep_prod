#INCLUDE "PROTHEUS.CH"
#INCLUDE "FWMVCDEF.CH"

/*/{Protheus.doc} NB00001
	TELA CRUD COM A TABELA V02 RESPONSAVEL PELO CADASTRO DE OCORRÊNCIAS DE CLIENTES DE ACORDO COM A CARGA
@type function
@author Carlos Batista
@since 27/08/2025
@version 1.0
/*/
USER FUNCTION NB00001()

 
    Local oBrowse //VARIAVEL OBJETO QUE RECEBERA O INSTANCIAMENTO DA CLASE FWMBROSE

    oBrowse := FWMBROWSE():New()

    oBrowse:SetAlias("V02") //PASSO A TABELA QUE EU QUERO MOSTAR NO BROWSE

    oBrowse:SetDescription("FABRICANTES") //DESCRIï¿½ï¿½O/CABECALHO DA TELA 

    oBrowse:ACTIVATE()


RETURN

// -------------------- CRIANDO O MENU --------------------------

Static Function MENUDEF()

    LOCAL aRotina := {}

    ADD OPTION aRotina TITLE 'Vizualizar' ACTION 'VIEWDEF.NB00001' OPERATION 2 ACCESS 0
    ADD OPTION aRotina TITLE 'Incluir'    ACTION 'VIEWDEF.NB00001' OPERATION 3 ACCESS 0
    ADD OPTION aRotina TITLE 'Alterar'    ACTION 'VIEWDEF.NB00001' OPERATION 4 ACCESS 0
    ADD OPTION aRotina TITLE 'Excluir'    ACTION 'VIEWDEF.NB00001' OPERATION 5 ACCESS 0


RETURN aRotina

// -------------------- CRIANDO O MODEL --------------------------

Static Function MODELDEF()

    LOCAL oModel := NIL //OBJETO MODELO

    LOCAL oStructV02 := FwFormStruct(1, "V02") //TRAZ A ESTRUTURA DA V02

    oModel := MPFormModel():NEW("NB00001M",,,,)

    oModel:AddFields("FORMV02",,oStructV02) //PERMITIR EDITAR SOMENTE 1 REGISTRO POR VEZ

    oModel:SetPrimaryKey({'V02_FILIAL','V02_CODIGO'}) //SETANDO A PRIMARY KEY

    oModel:SetDescription("CADASTRO DE FABRICANTES") //ADICIONANDO DESCRICAO AO MODELO 

    oModel:GetModel("FORMV02"):SetDescription("FABRICANTES")


Return oModel

// -------------------- CRIANDO A VIEW --------------------------

Static Function VIEWDEF()
    
    LOCAL oView := NIL
    LOCAL oModel := FwLoadModel("NB00001")

    LOCAL oStructV02 := FwFormStruct(2, "V02") //TRAZ A ESTRUTURA DA V02

    oView := FWFormView():New()
    oView:SetModel(oModel)

    oView:AddField("VIEW_V02", oStructV02, "FORMV02")

    oView:CreateHorizontalBox("TELA",100)    

    oView:EnableTitleView('VIEW_V02', 'DADOS DA V02') 

    oView:SetCloseOnOk({||.T.})

    oView:SetOwnerView("VIEW_V02","TELA")
    
    
Return oView
