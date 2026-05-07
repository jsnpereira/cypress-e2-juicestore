import { faker } from '@faker-js/faker';
import UserRegistrationPage from '../pages/UserRegistrationPage';
import DialogBox from '../pages/DialogBox';

describe('New register', () => {

    beforeEach(() => {
        cy.visit('/#/register')

        if (DialogBox.box.should('be.visible')) {
            DialogBox.closeDialogButton.should('be.visible');
            DialogBox.closeDialogButton.click();
        }
    })


    it('should register a new user', () => {
        cy.get('h1').should('contain', 'User Registration')

        var email = faker.internet.email();
        var password = faker.internet.password();
        var securityAnswer = faker.lorem.sentence();

        UserRegistrationPage.userRegistrationTitleCard.should('be.visible');
        UserRegistrationPage.emailInput.should('be.visible');
        UserRegistrationPage.emailInput.type(email);
        UserRegistrationPage.passwordInput.should('be.visible');
        UserRegistrationPage.passwordInput.type(password);
        UserRegistrationPage.repeatPasswordInput.should('be.visible');
        UserRegistrationPage.repeatPasswordInput.type(password);
        UserRegistrationPage.securityQuestionField.should('be.visible');
        UserRegistrationPage.securityQuestionField.click();
        UserRegistrationPage.question1Select.should('be.visible');
        UserRegistrationPage.question1Select.first().click();
        UserRegistrationPage.securityAnswerInput.should('be.visible');
        UserRegistrationPage.securityAnswerInput.type(securityAnswer);
        UserRegistrationPage.registerUserButton.should('be.visible');
        UserRegistrationPage.registerUserButton.click();

        cy.url().should('include', '/#/login');

        assert.isTrue(true, 'User registered successfully');

        cy.writeFile('cypress/fixtures/user.json', {
            email: email,
            password: password,
            securityAnswer: securityAnswer
        })  
    })

})