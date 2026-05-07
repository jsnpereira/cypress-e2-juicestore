
describe('Juice Shop', () => {

    beforeEach(() => {
        cy.visit('/#/')
    })
    it('should display the home page', () => {
        cy.get('#homeButton').should('contain', 'OWASP Juice Shop')
    })
})  
