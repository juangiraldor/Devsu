describe('Prueba E2E: Flujo completo de compra', () => {
    it ('Flujo de compra correcto con 2 productos', () => {
        //Realizar login
        cy.visit('/')
        cy.fixture('users').then((data) => {
            cy.login(data.standard.username, data.standard.password)
        })
        cy.get("[data-test=title]").should('be.visible')
        
        //Agregar 2 productos al carrito
        cy.fixture('products').then((data) => {
            const productsToAdd = [
                data.BikeLight.dataTest,
                data.Jacket.dataTest
            ]
            cy.addProducts(productsToAdd)
        })

        //Visualizar el carrito
        cy.get("[data-test=shopping-cart-link]").click()
        cy.fixture('products').then((data) => {
            cy.contains(data.BikeLight.name)
            cy.contains(data.Jacket.name)
        })

        //Completar formulario de compra
        cy.fixture('users').then((data) => {
            cy.checkout(data.standard.firstName, data.standard.lastName, data.standard.postalCode)
        })

        //Confirmación de compra
        cy.get("[data-test=complete-header]").should('be.visible')
    })
})