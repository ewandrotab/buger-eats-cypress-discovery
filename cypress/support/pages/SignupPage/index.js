const element = require('./elements').ELEMENTS

class SignupPage {

    go(title) {
        cy.visit('/')
        cy.get(element.linkDeliver).click()
        cy.get(element.titlePageDeliver).should('have.text', title)
    }

    fillForm(deliver) {

        cy.get(element.fieldName).type(deliver.name)
        cy.get(element.fieldCpf).type(deliver.cpf)
        cy.get(element.fieldEmail).type(deliver.email)
        cy.get(element.fieldWhatsApp).type(deliver.whatsapp)

        cy.get(element.fieldPostalCode).type(deliver.address.postalcode)
        cy.get(element.buttonBuscarCep).click()

        cy.get(element.fieldAddressNumber).type(deliver.address.number)
        cy.get(element.fieldAddressDetails).type(deliver.address.details)

        cy.get(element.fieldAddress).should('have.value', deliver.address.street)
        cy.get(element.fieldDistrict).should('have.value', deliver.address.district)
        cy.get(element.fieldCityState).should('have.value', deliver.address.city_state)

        cy.contains(element.deliveryMethod, deliver.delivery_method).click()

        cy.get(element.fieldUploadDocument).attachFile('/images/' + deliver.chn)

    }

    submitForm() {
        cy.get(element.buttonSubmit).click()
    }

    modalContentShouldBe(titleModal, expectedMessage) {
        cy.get(element.titleModal)
          .should('be.visible')
          .and('have.text', titleModal)        
        
        cy.get(element.messageModal)
          .should('be.visible')
          .and('have.text', expectedMessage)
    }

    modalContentNotExist() {
        cy.get(element.titleModal).should('not.exist')
        cy.get(element.messageModal).should('not.exist')

    }

    alertMessageShouldBe(expectedMessage) {
        //cy.get(element.fieldAlert).should('be.visible').and('have.text', expectedMessage)
        cy.contains(element.fieldAlert, expectedMessage).should('be.visible')
    }

    clearField(fieldName) {

        cy.get(fieldName).clear()

    }


}

export default new SignupPage()