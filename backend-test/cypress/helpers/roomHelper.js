// Url:
const urlRoomnew = 'http://localhost:3000/api/room/new'
const urlRooms = 'http://localhost:3000/api/rooms/'
const urlRoom = 'http://localhost:3000/api/room/'
// Skapar ny Bill Med faker
const faker = require('faker')
function createRandomRoom(){      
    const fakeprise = faker.finance.amount()
    const fakeavailable =  faker.random.boolean()
    const fakeanumber =  faker.random.number()
    const fakefloor = faker.random.number()
    const payload = 
    {
    "features":["balcony","sea_view"],
    "category":"double",
    "number":fakeanumber,
    "floor":fakefloor,
    "available":fakeavailable,
    "price":fakeprise}
    return payload
}
// Skappar & cheekar att den lagts in 
function NewRoom(cy,newRoom){    
        cy.LogIn().then((response =>{
            cy.request({
                method: "POST",
                url: urlRoomnew,
                headers:{
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },body:newRoom
            }).then((response =>{
                const newRoomAsString = JSON.stringify(response)
                expect(newRoomAsString).to.have.string(newRoom.number)
                expect(newRoomAsString).to.have.string(newRoom.floor)
                expect(newRoomAsString).to.have.string(newRoom.available)
                expect(newRoomAsString).to.have.string(newRoom.price)     
            }))
        }))
    } 
   /// Editerar första Rumet
    function EditFirstRoom(cy,editedRoom){ 
         
      const editFirstRoom  =  
        {"id":1,
        "created":"2020-01-03T12:00:00.000Z",
        "category":"single",
        "floor":editedRoom.floor,
        "number":editedRoom.number,
        "available":editedRoom.available,
        "price":editedRoom.price,
        "features":["balcony","ensuite"]}    
        cy.LogIn().then((response =>{
            cy.request({
                method: "PUT",
                url: urlRoom +'1',
                headers:{
                    'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },body:editFirstRoom
            })
        })) 
    } // Slut EditFirstBill 
    
/// Chekar värderna finns  
function RoomCheck(cy,number,floor,available,price){
    cy.LogIn().then((response =>{
        cy.request({
            method: "GET",
            url: urlRooms,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            }
        }).then((response =>{ 
        const newRoomAsString = JSON.stringify(response)
        expect(newRoomAsString).to.have.string(number)
        expect(newRoomAsString).to.have.string(floor)
        expect(newRoomAsString).to.have.string(available)
        expect(newRoomAsString).to.have.string(price)
            
    }))
        })) 
} 
// Tittar hur många ID:n 
function deleteRoom(cy){
    cy.request({
          method: "GET",
          url: urlRooms,
          headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
                    }
                }).then((response =>{
                 let lastId =   response.body[response.body.length -1].id
                 cy.log('Antal ID:n ' +(lastId+1) )
                 cy.request({
                    method:  "DELETE",
                    url:     urlRoom+lastId,
                    headers:{
                            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                            'Content-Type': 'application/json'   
                            } 
                    }).then((response =>{
                        const newRoomAsString = JSON.stringify(response.body)
                        expect(newRoomAsString).to.have.string(":true")
                        cy.log(newRoomAsString) // {"ok":true}

                    }))
        
})) } // Slut Delete    
  
    module.exports = {
        createRandomRoom,
        NewRoom,
        EditFirstRoom,
        RoomCheck,
        deleteRoom,   
    } 