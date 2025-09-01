//Bibliotecas
#Include "Totvs.ch"
#Include "FWMVCDef.ch"

//Variveis Estaticas
Static cTitulo := "Ocorrências"
Static cAliasMVC := "NB0"

/*/{Protheus.doc} Tela MVC Modelo 1 para o registros de Ocorrências Clietes x Carga
@author Carlos Batista
@since 01/09/2025
@version 1.0
@type function
/*/

User Function CadNB0()
    Local aArea   := FWGetArea()
    Local oBrowse
    Private aRotina := {}

    //Definicao do menu
    aRotina := MenuDef()

    //Instanciando o browse
    oBrowse := FWMBrowse():New()
    oBrowse:SetAlias(cAliasMVC)
    oBrowse:SetDescription(cTitulo)
    oBrowse:DisableDetails()

    //Ativa a Browse
    oBrowse:Activate()

    FWRestArea(aArea)
Return Nil

/*/{Protheus.doc} MenuDef
@author Carlos Batista
@since 01/09/2025
@version 1.0
@type function
/*/

Static Function MenuDef()
    Local aRotina := {}

    //Adicionando opcoes do menu
    ADD OPTION aRotina TITLE "Visualizar" ACTION "VIEWDEF.CadNB0" OPERATION 1 ACCESS 0
    ADD OPTION aRotina TITLE "Incluir" ACTION "VIEWDEF.CadNB0" OPERATION 3 ACCESS 0
    ADD OPTION aRotina TITLE "Alterar" ACTION "VIEWDEF.CadNB0" OPERATION 4 ACCESS 0
    ADD OPTION aRotina TITLE "Excluir" ACTION "VIEWDEF.CadNB0" OPERATION 5 ACCESS 0
    ADD OPTION aRotina TITLE "Copiar" ACTION "VIEWDEF.CadNB0" OPERATION 9 ACCESS 0

Return aRotina

/*/{Protheus.doc} ModelDef
Modelo de dados na funcao CadNB0
@author Luiz A.
@since 16/11/2023
@version 1.0
@type function
/*/

Static Function ModelDef()
    Local oStruct := FWFormStruct(1, cAliasMVC)
    Local oModel
    Local bPre := Nil
    Local bPos := Nil
    Local bCancel := Nil


    //Cria o modelo de dados para cadastro
    oModel := MPFormModel():New("CadNB0", bPre, bPos, /*bCommit*/, bCancel)
    oModel:AddFields("NB0MASTER", /*cOwner*/, oStruct)
    oModel:SetDescription(cTitulo)
    oModel:GetModel("NB0MASTER"):SetDescription( "Dados de - " + cTitulo)
    oModel:SetPrimaryKey({'NB0_FILIAL,NB0_CODIGO'})
Return oModel

/*/{Protheus.doc} ViewDef
Visualizacao de dados na funcao CadNB0
@author Carlos Batista  
@since 101/09/2025
@version 1.0
@type function
/*/

Static Function ViewDef()
    Local oModel := FWLoadModel("CadNB0")
    Local oStruct := FWFormStruct(2, cAliasMVC)
    Local oView

    //Cria a visualizacao do cadastro
    oView := FWFormView():New()
    oView:SetModel(oModel)
    oView:AddField("VIEW_NB0", oStruct, "NB0MASTER")
    oView:CreateHorizontalBox("TELA" , 100 )
    oView:SetOwnerView("VIEW_NB0", "TELA")

Return oView
