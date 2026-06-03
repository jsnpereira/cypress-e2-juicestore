// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import LoginPage from "../pages/LoginPage";
import DialogBox from "../pages/DialogBox";
import homePage from "../pages/HomePage";
import shoppingCartPage from "../pages/ShoppingCartPage";
import ShoppingCartPage from "../pages/ShoppingCartPage";

Cypress.Commands.add('login', (user, password) =>{
    cy.log("inicio de login");
    cy.visit('/#/login');

    if (DialogBox.box.should('be.visible')) {
        DialogBox.closeDialogButton.should('be.visible');
        DialogBox.closeDialogButton.click();
    }

    LoginPage.getLoginTitle().should('be.visible').and('have.text', 'Login');
    LoginPage.getLoginCard().should('be.visible');

    LoginPage.getEmailInput().should('be.visible');
    LoginPage.getEmailInput().type(user);
    LoginPage.getPasswordInput().should('be.visible');
    LoginPage.getPasswordInput().type(password);
    LoginPage.getLoginButton().should('be.visible');
    LoginPage.getLoginButton().click();
})

Cypress.Commands.add('addProductCart',(username, ...products) =>{
    cy.log('===Start Added the products in the cart =====');
    cy.log('addProductCart - username: '+ username);
    var address = `cypress/fixtures/${username}-cart.json`;

    cy.log("products array: "+products.toString());

    cy.wrap([]).then((cart) => {
        return cy.wrap(products).each((product) => {
            cy.log(`Product: '${product}'`)
            const element = homePage.findProduct(product).should('be.visible');
            homePage.addProductButton(element).click();
            
            let productName;
            let price;

            return cy.wrap(null).then(() => {
                return homePage.getProductprice(element).invoke('text').then((value) => {
                    price = value.trim();
                    cy.log('product price: ' + price);
                })
            }).then(() => {
                return homePage.findProduct(product).invoke('text').then((value) => {
                    productName = value.trim();
                    cy.log(`product: ${productName}`)
                })
            }).then(() => {
                var productItem = {
                    name: productName,
                    price: price
                }
                cy.log('Product item: ' + JSON.stringify(productItem))
                cart.push(productItem)
            })

        }).then(() => {
            // Agora o cart tem todos os produtos
            cy.log('Final cart: '+JSON.stringify(cart))
            cy.writeFile(address, { cart })
            cy.log('=== End Added the products in the cart =====');
        })
    })
})

Cypress.Commands.add('clearCart', () => {
    cy.visit('/#/basket');

    shoppingCartPage.deleteButtonForAllItens()
        .each(() => {
            shoppingCartPage.deleteButtonForAllItens().first()
                .click({ force: true })
                .wait(300);
        })
})

