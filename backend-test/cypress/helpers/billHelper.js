// Url:
const urlbillnew = 'http://localhost:3000/api/bill/new'
const urlbill = 'http://localhost:3000/api/bill/'
const urlbills = 'http://localhost:3000/api/bills/'
// Skapar ny Bill Med faker
const faker = require('faker')
function createRandomBill(){
    const fakeValue = faker.finance.amount()
    const fakePaid =  faker.random.boolean()
    const payload = {"value":fakeValue,"paid":fakePaid}
    return payload
}
// Skappar & cheekar att den lagts in 
function NewBill(cy,newbill){    
        cy.LogIn().then((response =>{
            cy.request({
                method: "POST",
                url: urlbillnew,
                headers:{
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },body:newbill
            }).then((response =>{
                const newBillAsString = JSON.stringify(response)
                expect(newBillAsString).to.have.string(newbill.value)     
            }))
        }))
    } 
   /// Editerar första Billen
    function EditFirstBill(cy,editFirstBill){ 
        cy.LogIn().then((response =>{
            cy.request({
                method: "PUT",
                url: urlbill +'1',
                headers:{
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },body:editFirstBill
            })
        })) 
    } // Slut EditFirstBill
/// Chekar värderna finns  
function billsCheck(cy,value,paid){
    cy.LogIn().then((response =>{
        cy.request({
            method: "GET",
            url: urlbills,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            }
        }).then((response =>{ 
        const newBillAsString = JSON.stringify(response)
        expect(newBillAsString).to.have.string(value)
        expect(newBillAsString).to.have.string(paid)
            }))
        })) 
} 
// Tittar hur många ID:n
function deleteBill(cy){
 //   cy.LogIn().then((response =>{  
        cy.request({
                method: "GET",
                url: urlbills,
                headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
                    }
                }).then((response =>{
                 let lastId =   response.body[response.body.length -1].id
                 cy.log('Antal ID:n ' +(lastId+1) )
                 cy.request({
                    method:    "DELETE",
                    url:       urlbill+lastId,
                    headers:{
                            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                            'Content-Type': 'application/json'   
                            } 
                    }).then((response =>{
                        const newBillAsString = JSON.stringify(response.body)
                        expect(newBillAsString).to.have.string(":true")
                        cy.log(newBillAsString) // {"ok":true}

                    }))
        
        })) } //)) } // Slut Delete  

        function billsCheckNotthere(cy,value){
            cy.LogIn().then((response =>{
                cy.request({
                    method: "GET",
                    url: urlbills,
                    headers:{
                        'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                        'Content-Type': 'application/json'
                    }
                }).then((response =>{ 
                const newBillAsString = JSON.stringify(response)
                expect(newBillAsString).to.not.have.string(value)
                    }))
                })) 
        }     
  
    module.exports = {
        createRandomBill,
        NewBill,
        EditFirstBill,
        billsCheck,
        deleteBill,
        billsCheckNotthere   
    } 