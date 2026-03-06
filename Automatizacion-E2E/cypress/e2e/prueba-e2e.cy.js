describe('Prueba E2E: Flujo completo de compra', () => {
    it ('Login correcto', () => {
        cy.visit('/')
        cy.fixture('users').then((data) => {
            cy.login(data.standard.username, data.standard.password)
        })
        cy.get("[data-test=title]").should('be.visible')
    })
})