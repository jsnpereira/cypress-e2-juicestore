class HomePage{
    mainTitleHeader(){
        return cy.get('#homeButton')
    }

    accountButton(){
        return cy.get('#navbarAccount')
    }

    loginMenuButton(){
        return cy.get('.mat-mdc-menu-content')
    }

    findProduct(product){
        return cy.contains('div.name', product);
    }

    getProductprice (element){
        return element.parentsUntil("mat-card").parent().find('.footer .price');
    }

    addProductButton(element){
        return element.parentsUntil("mat-card").parent().find('.footer button');
    }

    cartCountNotification(){
        return cy.get('span .fa-layers-counter')
    }

    cartButton(){
        return cy.xpath('.//span[contains(@class,\'mdc-button\')]//span[contains(@class,\'basket-label\')]')
    }
}

export default new HomePage;