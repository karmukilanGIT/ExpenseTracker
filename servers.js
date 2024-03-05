const mongoose=require('mongoose')
const express=require('express')
const   {Expense} =require('./schema.js')
const bodyparser=require('body-parser')
console.log("hello")
const app=express()
app.use(bodyparser.json())
async function connectdb(){
    try{
        await mongoose.connect('mongodb+srv://karmukilan:kar123@database.8i9i2d2.mongodb.net/expensetracker?retryWrites=true&w=majority&appName=database')
    console.log("DB CONNECTED")
    const port=8000
    app.listen(port,()=>{
    console.log(`listening on port ${port}`)
    })
    }
    catch(error){
        console.log(error)
        console.log("NOT CONNECTED")
    }
}
// const Expense=mongoose.model('EXPENSE_DETAILS',expensetrackerschema)
connectdb()
app.post('/add',async(request,response)=>{
    // console.log(request.body)
    // response.json({
    //     "status":"created"
    // })
   try{
    await Expense.create({
        "amount":request.body.amount,
        "category":request.body.category,
        "date":request.body.date
    })
    response.status(200).json({
        "status":"successful"
    })
   }
   catch(error){
    console.log(error)
    response.status(404).json({
        "status":"unsuccessful"
    })
   }
})
app.get('/get-expense',async(request,response)=>{
   try{
     const data=await Expense.find()
     console.log(data)
     response.json({
        "status":"successful",
         "data":data
       })
    //  response.status(200).json(data)
     
   }
   catch(error){
   response.json({
    "status":"unsuccessful"
   })
   }
    
})

app.delete('/delete-expense/:id',async  function(request,response) 
{
   try{
    const expenseEntry = Expense.findById(request.params.id)
   if(expenseEntry) {
    await Expense.findByIdAndDelete(request.params.id)
    response.status(200).json({
        "status":"succes",
        "messgae":"deleted entry"
    })
   }else{
    response.status(404).json({
        "status":"failure",
        "messgae":"could not find entry"
    })
   }
   }
   catch(error){
    response.status(404).json({
        "status":"failure",
        "messgae":"could not find entry"
    })
   }
})
app.patch('/edit-expense/:id',async function(request,response){
    const expenseEntry = await Expense.findById(request.params.id)
    try{
        const expenseEntry = Expense.findById(request.params.id)
        if(expenseEntry){
            await expenseEntry.updateOne({
                "amount" : request.body.amount,
                "category" : request.body.category,
                "date" : request.body.date
            })
            response.status(200).json({
                "status" : "success",
                "message" : "update entry success"
            })
        }
        else{
            response.status(404).json()({
                "status" : "failure",
                "message" : "could not update document"
            })
        }
    }catch(error){
        response.status(404).json()({
            "status" : "failure",
            "message" : "could not update document",
            "error" : error
        })
    }
})

app.patch('/edit-expense',async function(request,response){
    const expenseEntry = await Expense.findById(response.params.id)
    try{
        if(expenseEntry){
            await expenseEntry.updateOne({
                "amount" : request.body.amount,
                "category" : request.body.category,
                "date" : request.body.date
            })
            response.status(200).json({
                "status" : "success",
                "message" : "updated entry"
            })
        }
        else{
            response.status(200).json({
                "status" : "failure",
                "message" : "could not update document"
            })
        }
    }
    catch(error){
        response.status(200).json({
            "message" : "could not update document"
        })
    }
})