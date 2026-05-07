class UserRegistrationPage {

    get userRegistrationTitleCard() {
        return cy.get('h1').should('contain', 'User Registration');

    } 
    get emailInput() {
        return cy.get('#emailControl');
    }

    get passwordInput() {
        return cy.get('#passwordControl');
    }

    get repeatPasswordInput() {
        return cy.get('#repeatPasswordControl');
    }
    
    get securityAnswerInput() {
        return cy.get('#securityAnswerControl');
    }

    get securityQuestionField() {
        return cy.get('.security-container .mat-mdc-form-field-type-mat-select .mdc-text-field');
    }

    get securityQuestionList() {
        return cy.get('.mat-select-4-panel');
    }

    get question1Select() {
        return cy.get('.mat-mdc-option');
    }

    get registerUserButton() {
        return cy.get('#registerButton');
    }
}

export default new UserRegistrationPage();    
