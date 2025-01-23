const express=require("express")
const app=express()
app.use(express.json())
const mongoose=require("mongoose")
const {v4:uuidv4}=require("uuid")

const port=8000


const mongurl="mongodb+srv://jayasudhij2023it:sudhi123@expense-tracker.b2cqn.mongodb.net/et"
mongoose
  .connect(mongurl)
  .then(()=>{
    console.log("Db connected")
    app.listen(port,()=>{
        console.log("My server is running")
    })
  })

  const expenseSchema=new mongoose.Schema({
    id:{type:String ,required:true,unique:true},
    title:{type:String,required:true},
    amount:{type:Number,required:true},
});


const expenseModel=mongoose.model("expense_tracker",expenseSchema);//collection name,schema

app.post("/api/expense",async(req,res)=>{
    const{title,amount}=req.body;
    const newExpense=new expenseModel({
        id:uuidv4(),
        title:title,
        amount:amount,
     });
     const savedExpense=await newExpense.save();
     res.status(200).json(savedExpense);
});


// app.get("/api/expensegetById",async(req,res)=>{///method one too get the data by using get method
//     const {title}=req.params;
//     try{
//     const getExpense=await expenseModel.findOne(title);
//     res.status(200).json(getExpense);
//    }
//     catch(error)
//     {
//         res.status(500).json({message:"error",error:error.message});
//     }
// });





app.get("/api/expenseget",async(req,res)=>{//another method too gett the data
const getExpense=await expenseModel.find({});
    res.status(200).json(getExpense);
});




// app.get("/api/expensegetById",async(req,res)=>{///method one too get the data by using get method
//     const {title}=req.params;
    
//     const getExpense=await expenseModel.findOne({title});
//     res.status(200).json(getExpense);
   
//     });

app.get('/api/expensegetById/:id', async (req, res) => {
    const {id} = req.params;
    const getid= await expenseModel.findOne({id});
    res.json(getid)
});


app.put("/api/expenses/:id",async(req,res)=>{
    const {id}=req.params;
    const {title,amount}=req.body;
    const updateexpense=await expenseModel.findOneAndUpdate(
        {
            id:id,
        },
        {
            title:title,
            amount:amount,
        }
    )
    res.json(updateexpense);
});


app.delete('/api/expensedeleteById/:id', async (req, res) => {
    const {id} = req.params;
    const getid= await expenseModel.deleteOne({id});
    res.json(getid)
});





