import homePage from "../pages/HomePage";
import shoppingCartPage from "../pages/ShoppingCartPage";

describe( "Shopping Cart", () => {
    let user;

    beforeEach(() => {
        cy.fixture('user').then((data) => {
            user = data;
            cy.login(data.email, data.password);
        });
        cy.visit('/');
    })

    afterEach(() =>{
        cy.clearCart();
        cy.task(
            'deleteFile',
            `cypress/fixtures/${user.email}-cart.json`
        )
    })

    it('Should add one product to the cart and check notification cart', () => {
        var findProduct = ['Apple Juice']
        cy.addProductCart(user.email,...findProduct);
        homePage.cartCountNotification().should('have.text', 1)
    })

    it('check the product in the cart', () => {
        var findProduct = ['Apple Juice']
        cy.addProductCart(user.email,...findProduct);

        homePage.cartButton().scrollIntoView().should('be.visible').click();
        shoppingCartPage.titleCard().should('contain.text', 'Your Basket');
        shoppingCartPage.productsList().should('be.visible')
             .should('have.length', 1)

        cy.fixture(`${user.email}-cart`).then((data) => {
            shoppingCartPage.productsList().each(($row, index) => {
                    const item = data.cart[index];
                    shoppingCartPage.productNameByItemColumn($row)
                        .invoke('text').then((data) => {
                                 expect(data.trim()).equals(item.name);
                          })
                    shoppingCartPage.productPriceByItemColumn($row)
                        .invoke('text').then((data) => {
                            expect(data.trim()).equals(item.price);
                        })
            })
        });
    })

    it('Check the total price of the products in the cart', () => {
        let totalPrice = 0;
        var findProduct = ['Apple Juice','Basil Smoothie']
        cy.addProductCart(user.email,...findProduct);
        homePage.cartButton().scrollIntoView().should('be.visible').click();

        shoppingCartPage.productsList().should('have.length', 2);

        cy.log(`cypress/fixtures/${user.email}-cart`);
        cy.readFile(`cypress/fixtures/${user.email}-cart.json`).then((data) => {
            cy.log(JSON.stringify(data))

            cy.log("cart list size: "+ data.cart.length);
            data.cart.forEach((item) => {
                cy.log('Product: '+item.name);
                shoppingCartPage.productItemByName(item.name).should('be.visible');
                var value = Number(
                    item.price.replace(/[^\d.]/g, '')
                )
                cy.log('price: ' + value);
                totalPrice = totalPrice + value;
            })
        }).then(() => {
            shoppingCartPage.priceTotal().should('be.visible');
            shoppingCartPage.priceTotal().invoke('text').then((value) => {
                expect(value.trim()).to.contain(totalPrice.toString());
            })

            cy.log('total price: ' + totalPrice);
        });
    })
})