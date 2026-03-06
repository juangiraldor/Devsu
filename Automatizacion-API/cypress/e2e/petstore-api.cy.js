describe('Prueba Petstore API', () => {
    let petId

    //Se obtiene el id de la mascota desde el json
    before(() => {
        cy.fixture('pet').then((pet) => {
            petId = pet.id
        })
    })

    //Caso de prueba crear una mascota
    it('Agregar una mascota a la tienda', () => {
        cy.fixture('pet').then((pet) => {
            cy.request({
                method: 'POST',
                url: 'https://petstore.swagger.io/v2/pet',
                body: pet
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.name).to.eq(pet.name)
                expect(response.body.status).to.eq(pet.status)
            })
        })
    })

    //Caso de prueba para obtener la mascota creada
    it('Consultar la mascota agregada previamente', () => {
        cy.request({
            method: 'GET',
            url: 'https://petstore.swagger.io/v2/pet/${petId}'
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.id).to.eq(petId)
        })
    })

    //Caso de prueba para actualizar el nombre y el estado de la mascota
    it('Actualizar nombre y estado de la mascota a sold', () => {
        const updatePet = {
            id: petId,
            name: "Dangercito",
            status: "sold"
        }
        cy.request({
            method: 'PUT',
            url: 'https://petstore.swagger.io/v2/pet',
            body: updatePet
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.name).to.eq("Dangercito")
            expect(response.body.status).to.eq("sold")
        })
    })

    //Caso de prueba para consultar la mascota por estatus
    it('Consultar mascota por estatus', () => {
        cy.request({
            method: 'GET',
            url: 'https://petstore.swagger.io/v2/pet/findByStatus?status=sold',
        }).then((response) => {
            expect(response.status).to.eq(200)
            const petFound = response.body.find(pet => pet.id === petId)
            expect(petFound).to.not.be.undefined
            expect(petFound.status).to.eq("sold")
        })
    })

})