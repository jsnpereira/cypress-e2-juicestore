class HomePage{
    get mainTitleHeader(){
        return cy.get('#homeButton')
    }

    get accountButton(){
        return cy.get('#navbarAccount')
    }

    get loginMenuButton(){
        return cy.get('.mat-mdc-menu-content')
    }
}