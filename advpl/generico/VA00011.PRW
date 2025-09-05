#INCLUDE "PROTHEUS.CH"
#INCLUDE "FWMVCDEF.CH"

/*/{Protheus.doc} VA00011
	TELA CRUD COM A TABELA V02 RESPONSAVEL PELO CADASTRO DE FABRICANTE A SER USADO NA TABELA SB1
@type function
@author VENANCIO ALVES
@since 28/11/2022
@version 1.0
@return ${return}, ${return_description}
@example
(examples)
@see (links_or_references)
/*/
USER FUNCTION VA00011()

 
    Local oBrowse //VARIAVEL OBJETO QUE RECEBERA O INSTANCIAMENTO DA CLASE FWMBROSE

    oBrowse := FWMBROWSE():New()

    oBrowse:SetAlias("NB0") //PASSO A TABELA QUE EU QUERO MOSTAR NO BROWSE

    oBrowse:SetDescription("OCORRENCIAS") //DESCRI��O/CABECALHO DA TELA 

    oBrowse:ACTIVATE()


RETURN

// -------------------- CRIANDO O MENU --------------------------

Static Function MENUDEF()

    LOCAL aRotina := {}

    ADD OPTION aRotina TITLE 'Vizualizar' ACTION 'VIEWDEF.VA00011' OPERATION 2 ACCESS 0
    ADD OPTION aRotina TITLE 'Incluir'    ACTION 'VIEWDEF.VA00011' OPERATION 3 ACCESS 0
    ADD OPTION aRotina TITLE 'Alterar'    ACTION 'VIEWDEF.VA00011' OPERATION 4 ACCESS 0
    ADD OPTION aRotina TITLE 'Excluir'    ACTION 'VIEWDEF.VA00011' OPERATION 5 ACCESS 0
    //ADD OPTION aRotina TITLE 'IMPORTAR CSV'    ACTION 'U_VA00001'  OPERATION 6 ACCESS 0

    /*
    1 - PESQUISAR
    2 - VISUALIZAR
    3 - INCLUIR
    4 - ALTERAR
    5 - EXCLUIR
    6 - OUTRAS FUNCOES
    7 - COPIAR
    */


RETURN aRotina

// -------------------- CRIANDO O MODEL --------------------------

Static Function MODELDEF()

    LOCAL oModel := NIL //OBJETO MODELO

    LOCAL oStructV02 := FwFormStruct(1, "NB0") //TRAZ A ESTRUTURA DA V02

    oModel := MPFormModel():NEW("VA00011M",,,,)

    oModel:AddFields("FORMV02",,oStructV02) //PERMITIR EDITAR SOMENTE 1 REGISTRO POR VEZ

    oModel:SetPrimaryKey({'NB0_FILIAL','NB0_CODIGO'}) //SETANDO A PRIMARY KEY

    oModel:SetDescription("CADASTRO DE FABRICANTES") //ADICIONANDO DESCRICAO AO MODELO 

    oModel:GetModel("FORMV02"):SetDescription("FABRICANTES")


Return oModel

// -------------------- CRIANDO A VIEW --------------------------

Static Function VIEWDEF()
    
    LOCAL oView := NIL
    LOCAL oModel := FwLoadModel("VA00011")

    LOCAL oStructV02 := FwFormStruct(2, "NB0") //TRAZ A ESTRUTURA DA V02

    oView := FWFormView():New()
    oView:SetModel(oModel)

    oView:AddField("VIEW_V02", oStructV02, "FORMV02")

    oView:CreateHorizontalBox("TELA",100)    

    oView:EnableTitleView('VIEW_V02', 'DADOS DA V02') 

    oView:SetCloseOnOk({||.T.})

    oView:SetOwnerView("VIEW_V02","TELA")
    
    
Return oView
