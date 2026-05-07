import LoginPage from '../pages/LoginPage';
import DialogBox from '../pages/DialogBox';

describe('Login', () => {
    beforeEach(() => {
        cy.visit('/#/login');

        if (DialogBox.box.should('be.visible')) {
            DialogBox.closeDialogButton.should('be.visible');
            DialogBox.closeDialogButton.click();
        }
    });

    it('should display the login form', () => {
        LoginPage.getLoginTitle().should('be.visible').and('have.text', 'Login');   
        LoginPage.getLoginCard().should('be.visible');

        cy.fixture('user').then((user) => {
            LoginPage.getEmailInput().should('be.visible');
            LoginPage.getEmailInput().type(user.email);
            LoginPage.getPasswordInput().should('be.visible');
            LoginPage.getPasswordInput().type(user.password);
            LoginPage.getLoginButton().should('be.visible');
            LoginPage.getLoginButton().click();
         })
          
        })
});