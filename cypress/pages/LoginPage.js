class LoginPage {

    getLoginTitle() {
        return cy.get('h1');
    }
    getLoginCard() {
        return cy.get('#login-form');
    }

    getNewCustomerLink() {
        return cy.get('#newCustomerLink');
    }

    getEmailInput() {
        return cy.get('#email');
    }

    getPasswordInput() {
        return cy.get('#password');
    }
    
    getLoginButton() {
        return cy.get('#loginButton');
    }

}

export default new LoginPage;   