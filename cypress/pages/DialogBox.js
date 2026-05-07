class DialogBox {

    get box() {
        return cy.get('.mat-mdc-dialog-surface');
    }

    get closeDialogButton() {
        return cy.get('.close-dialog');
    }   
}

export default new DialogBox();