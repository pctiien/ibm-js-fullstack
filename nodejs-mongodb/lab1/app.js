const mongoose = require('mongoose')
const employee = require('./employee')
const uri = 'mongodb+srv://pctien1401:jNt8KUzytP2oBT5g@learning.2xahm.mongodb.net/'
mongoose.connect(uri,{'dbName': 'employeeDB'})
employee.find().then((data)=>{
    console.log(data);
    mongoose.connection.close()
})
