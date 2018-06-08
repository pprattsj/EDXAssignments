//Merge customer lists
//requires

const mongodb = require('mongodb')    //uses  mongodb@2.2.23 to get collections and db to work well.
const p = require('path')
const customers = require(p.join(__dirname,'m3-complete-customer'))
const addresses = require(p.join(__dirname,'m3-customer-address-data'))
const a = require ('async')


/// Instantiates
const MongoClient = mongodb.MongoClient
const collect = 'customers';
const dbname = "edx";


// get parameter to limit size for DB loads or use 10 as the te default
var limit =10
var myArgs = process.argv.slice(2);
if (myArgs[0]) {
 limit = parseInt(myArgs[0],10);
}
var Tasks = []

///  Connection URI
const url = 'mongodb://localhost:27017'

// Events


// merge file records
for(let x= 0; x<customers.length; x++) {
	customers[x]= Object.assign(customers[x],addresses[x])
}
 

 
MongoClient.connect(url, (err, dbase) => {
  if (err) return process.exit(1)
  console.log('Kudos. Connected successfully to server')
  const db = dbase.db(dbname);
  const collection = db.collection(collect)
  const starttime = Date.now()  
     
 // populate task list
  for (let k = 0; k<customers.length; k=k+limit) {
    Tasks.push(function(callback){
		console.log("new job " + parseInt(k,10))
		for (var s =k; s<k+limit;s++)
		//if (customers[s].id % 5 ==0)  //restraint the entries for testing
		{
			collection.insert(customers[s], (error,result) => {
               if (error) return process.exit(1)
            })
		    //console.log(customers[s].id)
	    }
		//item.someAynchCall(function(){
		callback();
		//})
	})
  }
   
   
   a.parallel(Tasks,function(err,data){
	   //callback
	   const duration = Date.now() -starttime

	   if (err) return process.exit(1)
   console.log("items saved to " + collect + " in " + dbname + " in " + duration)
   })
   db.close()
})   

   

   