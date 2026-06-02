class ShoppingCartPage{
    titleCard(){
        return cy.get('div.mdc-card h1')
    }

    productsList(){
        return cy.xpath('//*[contains(@class,\'mat-mdc-table\')]/*[contains(@class,\'mat-mdc-row\')]');
    }

    productItemByName(value){
        var element = `.//*[contains(@class,'mat-column-product') and contains(text(),'${value}')]`
        return cy.xpath(element)
    }

    productNameByItemColumn(element){
        return cy.wrap(element).xpath('//*[contains(@class,\'mat-column-product\')]');
    }

    productPriceByItemColumn(element){
        return cy.wrap(element).xpath('//*[contains(@class,\'mat-column-price\')]');
    }

    deleteButtonForAllItens(){
        return cy.xpath(`//*[contains(@class,' mat-column-remove')]/button`, { timeout: 1000 })
    }
    priceTotal(){
        return cy.get('div #price')
    }

    removeByProduct(name) {
        var element = `.//*[contains(@class,'mat-column-product') and contains(text(),'${name}')]/following-sibling::*[contains(@class,'mat-column-remove')]/button`
        return cy.xpath(element);
    }
}

export default new ShoppingCartPage;