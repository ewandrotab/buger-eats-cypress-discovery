var faker = require('faker')
var cpf = require('gerador-validador-cpf')

export default {
    deliver: function () {

        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()
        
        var data = {
            name: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            email: faker.internet.email(firstName),
            whatsapp: "4199998877",
            address: {
                postalcode: 81250000,
                street: "Rua José Batista dos Santos",
                number: 1000,
                details: "Terreo",
                district: "Cidade Industrial",
                city_state: "Curitiba/PR"
            },
            delivery_method: "Moto",
            chn: "cnh-bean.jpg"
        }

        return data
    }
}