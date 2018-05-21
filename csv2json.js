
/*
// customer-data.csv
//
//id,first_name,last_name,email,gender,ip_address,ssn,credit_card,bitcoin,street_address
//1,Ario,Noteyoung,anoteyoung0@nhs.uk,Male,99.5.160.227,509-869654,
//  5602256742685208,179BsXQkUuC6NKYNsQkdmKQKbMBPmJtEHB,0227 Kropf Court
//
//  into
// customer-data.json
//
//[
//  {
//    "id": "1",
//    "first_name": "Ario",
//    "last_name": "Noteyoung",
//    "email": "anoteyoung0@nhs.uk",
//    "gender": "Male",
//    "ip_address": "99.5.160.227",
//    "ssn": "509-86-9654",
//    "credit_card": "5602256742685208",
//    "bitcoin": "179BsXQkUuC6NKYNsQkdmKQKbMBPmJtEHB",
//    "street_address": "0227 Kropf Court"
//  },
*/

const readline = require('readline');
const http = require('http')
const fs = require('fs')
const path = require('path')
const csv = require('csv');

//Read  csv


var myInterface = readline.createInterface({
  input: fs.createReadStream(path.join(__dirname, '/customer-data.csv'))
});

var lineno = 0;
var header;
var formatted = '[';

myInterface.on('line', function (line) {
  if (lineno==0) {   //get the header names out of the 1st row of the file.
     header = line.split(","); 
     //debugging tool
     //console.log(header);
  }
  else {
     formatted += '{';
     var arr = line.split(","); 
     for (x=0;x<=8; x++){
          //debug tool
          //console.log(header[x], ":", arr[x]); 
        formatted += '\"'+header[x]+'\"'+ ":"+ '\"'+arr[x]+'\",'; } 
     formatted += '\"'+header[9]+'\"'+ ":"+ '\"'+arr[9]+'\"}';      
       //debugging tool
       //console.log(formatted);
       //console.log('-----------------------------------');
  }
  
  lineno++;
});

//write json

myInterface.on('close' , function(){

  formatted += ']';

   var j = JSON.stringify(formatted);
    //debugging tool
    //console.log(j);
    //console.log(lineno);
   fs.writeFile( path.join(__dirname, 'customer-data.json'), j );    
   console.log( path.join(__dirname, 'customer-data.json')+ ' has been created');
   
});