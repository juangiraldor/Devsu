Cypress.Commands.add('login', (user, password) => {
    cy.get("[data-test=username]").clear().type(user)
    cy.get("[data-test=password]").clear().type(password)
    cy.get("[data-test=login-button]").click()
})

Cypress.Commands.add('addProducts', (products) => {
    products.forEach((product) => {
        cy.get(`[data-test=${product}]`).click()
    })  
})

Cypress.Commands.add('checkout', (firstName, lastName, postalCode) => {
    cy.get("[data-test=checkout]").click()
    cy.get("[data-test=firstName]").clear().type(firstName)
    cy.get("[data-test=lastName]").clear().type(lastName)
    cy.get("[data-test=postalCode]").clear().type(postalCode)
    cy.get("[data-test=continue]").click()
    cy.get("[data-test=finish]").click()
})