/// <reference types="cypress" />  

import * as billHelper from '../helpers/billHelper'
import * as roomHelper from '../helpers/roomHelper'
describe('Testfall', function(){
    // Skapar ett nytt rum
    const newroom = roomHelper.createRandomRoom()
    it ('New Room', function(){
        roomHelper.NewRoom(cy,newroom)
        roomHelper.RoomCheck(cy,newroom.number,newroom.floor,newroom.available,newroom.price)
       })
    // Editerar första rumet id=1   
       it ('Edit First Room', function(){
        const Editnewroom = roomHelper.createRandomRoom()
        roomHelper.EditFirstRoom(cy,Editnewroom)
        roomHelper.RoomCheck(cy,Editnewroom.number,Editnewroom.floor,Editnewroom.available,Editnewroom.price)
       })
    // Deletar sista rumet   
        it ('Delete Room', function(){       
            roomHelper.deleteRoom(cy)
        })
    
 // Skapar ett ny räkning   
    const newbill = billHelper.createRandomBill()
    it ('New Bill', function(){
     
        billHelper.NewBill(cy,newbill)
        billHelper.billsCheck(cy,newbill.value,newbill.paid)
    })
 // Editerar första räkningen   
    it ('Edit First Bill', function(){
       const newBill = billHelper.createRandomBill()
       const EditFirstBill = {"id":1,"created":"2020-01-07T12:00:00.000Z","value":newBill.value,"paid":newBill.paid}
       billHelper.EditFirstBill(cy,EditFirstBill)
       billHelper.billsCheck(cy,newBill.value,newBill.paid)

    })
 // Deltar & undersöker att den nya räkningen är borta  
    it ('Delete Bill', function(){       
        billHelper.deleteBill(cy)
        billHelper.billsCheckNotthere(cy,newbill.value)
    })
   
}) // Slut på test

