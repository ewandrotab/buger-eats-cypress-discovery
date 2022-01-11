/// <reference types="Cypress" />

import SignupPage from '../support/pages/SignupPage'
import SignupFactory from '../factories/SignupFactory'
const element = require('../support/pages/SignupPage/elements').ELEMENTS

describe('Cadastro', () => {

    const title = 'Cadastre-se para  fazer entregas'

    beforeEach(function() {
        
        // cy.fixture("deliver").then((deliver) => {
        //     this.deliver = deliver
        // })


    });

    afterEach(function() {
        cy.screenshot()

    });

    

    it('Usuário deve ser tornar um deliver', function() {
                
        var deliver = SignupFactory.deliver()
        
        const titleModal = 'Aí Sim...'
        const modalMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'

        SignupPage.go(title)
        SignupPage.fillForm(deliver)
        SignupPage.submitForm()
        SignupPage.modalContentShouldBe(titleModal, modalMessage)

    })

    it('Usuário com CPF inválido', function() {
        
        var deliver = SignupFactory.deliver()

        deliver.cpf = '875698702AA'
        
        SignupPage.go(title)
        SignupPage.fillForm(deliver)
        SignupPage.submitForm()
        SignupPage.alertMessageShouldBe('Oops! CPF inválido')
        SignupPage.modalContentNotExist()

    })

    it('Usuário com Email inválido', function() {
        
        var deliver = SignupFactory.deliver()

        deliver.email = 'empregado.empresa.com.br'
        
        SignupPage.go(title)
        SignupPage.fillForm(deliver)
        SignupPage.submitForm()
        SignupPage.alertMessageShouldBe('Oops! Email com formato inválido.')
        SignupPage.modalContentNotExist()

    })

    it('Usuário sem nome informado', function() {
        
        var deliver = SignupFactory.deliver()
        
        SignupPage.go(title)
        SignupPage.fillForm(deliver)
        SignupPage.clearField(element.fieldName)
        SignupPage.submitForm()
        SignupPage.alertMessageShouldBe('É necessário informar o nome')
        SignupPage.modalContentNotExist()

    })

    it('Usuário sem CPF informado', function() {

        var deliver = SignupFactory.deliver()
        
        SignupPage.go(title)
        SignupPage.fillForm(deliver)
        SignupPage.clearField(element.fieldCpf)
        SignupPage.submitForm()
        SignupPage.alertMessageShouldBe('É necessário informar o CPF')
        SignupPage.modalContentNotExist()

    })

    context('Campos Obrigatórios', function() {

        const messages = [

            {field: 'name', message: 'É necessário informar o nome'},
            {field: 'cpf', message: 'É necessário informar o CPF'},
            {field: 'email', message: 'É necessário informar o email'},
            {field: 'postalcode', message: 'É necessário informar o CEP'},
            {field: 'number', message: 'É necessário informar o número do endereço'},
            {field: 'delivery_method', message: 'Selecione o método de entrega'},
            {field: 'cnh', message: 'Adicione uma foto da sua CNH'}

        ]

        before(function(){
            
            SignupPage.go(title)
            SignupPage.submitForm()

        })

        messages.forEach(function(msg){
            it(`${msg.field} is required`, function(){
                SignupPage.alertMessageShouldBe(msg.message)
            })
        })

    })
})