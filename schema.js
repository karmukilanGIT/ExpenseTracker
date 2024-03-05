const mongoose=require('mongoose')

const expensetrackerschema=new mongoose.Schema({
    amount:{
        type:Number
    },
    category:{
        type:String
    },
    date:{
        type:String
    }
})

const Expense=mongoose.model('EXPENSE_DETAILS',expensetrackerschema)

module.exports={Expense}