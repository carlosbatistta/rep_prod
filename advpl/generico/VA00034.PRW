#INCLUDE "PROTHEUS.CH"
#INCLUDE "FWMVCDEF.CH"

/*/{Protheus.doc} VA00034
	TELA CRUD EQUIPAMENTOS TI
@type function
@author VENANCIO ALVES
@since 28/11/2022
@version 1.0
@return ${return}, ${return_description}
@example
(examples)
@see (links_or_references)
/*/
USER FUNCTION VA00034()

 
    Local oBrowse //VARIAVEL OBJETO QUE RECEBERA O INSTANCIAMENTO DA CLASE FWMBROSE

    oBrowse := FWMBROWSE():New()

    oBrowse:SetAlias("V34") //PASSO A TABELA QUE EU QUERO MOSTAR NO BROWSE

    oBrowse:SetDescription("Caracteristicas") //DESCRI��O/CABECALHO DA TELA 

    oBrowse:ACTIVATE()


RETURN

// -------------------- CRIANDO O MENU --------------------------

Static Function MENUDEF()

    LOCAL aRotina := {}

    ADD OPTION aRotina TITLE 'Vizualizar' ACTION 'VIEWDEF.VA00034' OPERATION 2 ACCESS 0
    ADD OPTION aRotina TITLE 'Incluir'    ACTION 'VIEWDEF.VA00034' OPERATION 3 ACCESS 0
    ADD OPTION aRotina TITLE 'Alterar'    ACTION 'VIEWDEF.VA00034' OPERATION 4 ACCESS 0
    ADD OPTION aRotina TITLE 'Excluir'    ACTION 'VIEWDEF.VA00034' OPERATION 5 ACCESS 0
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

    LOCAL oStructV34 := FwFormStruct(1, "V34") //TRAZ A ESTRUTURA DA V34

    oModel := MPFormModel():NEW("VA00034M",,,,)

    oModel:AddFields("FORMV34",,oStructV34) //PERMITIR EDITAR SOMENTE 1 REGISTRO POR VEZ

    oModel:SetPrimaryKey({'V34_FILIAL','V34_CODIGO'}) //SETANDO A PRIMARY KEY

    oModel:SetDescription("Caracteristicas ") //ADICIONANDO DESCRICAO AO MODELO 

    oModel:GetModel("FORMV34"):SetDescription("Caracteristicas ")


Return oModel

// -------------------- CRIANDO A VIEW --------------------------

Static Function VIEWDEF()
    
    LOCAL oView := NIL
    LOCAL oModel := FwLoadModel("VA00034")

    LOCAL oStructV34 := FwFormStruct(2, "V34") //TRAZ A ESTRUTURA DA V34

    oView := FWFormView():New()
    oView:SetModel(oModel)

    oView:AddField("VIEW_V34", oStructV34, "FORMV34")

    oView:CreateHorizontalBox("TELA",100)    

    oView:EnableTitleView('VIEW_V34', 'DADOS DA V34') 

    oView:SetCloseOnOk({||.T.})

    oView:SetOwnerView("VIEW_V34","TELA")
    
    
Return oView
