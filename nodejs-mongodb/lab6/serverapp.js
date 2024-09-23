const express = require('express')

const app = express()

const port = 3000

app.use((err, req, res, next) => {
    // Set default values for status code and status if not provided in the error object
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "Error";
    // Log the error stack to the console for debugging purposes
    console.log(err.stack);
    // Send a JSON response with formatted error details
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

app.get('/',async(req,res)=>{
    res.send('This endpoint works')
})

app.get('/squarenumber/:num',async(req,res,next)=>{
    let x= req.params.num
    if(isNaN(x))
    {
        next(new Error("Input not a number"));
        return 
    }
    res.json({"square": x*x})
})
app.get('/cubenumber/:num', async (req, res,next) => {
    let x = req.params.num;
    if (isNaN(x)){
        const err = new Error('Invalid input');
        err.statusCode = 400;
        err.details = 'The input must be a number';
        next(err);
    } else {
        res.json({"cube":x*x*x});
    }
});
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})
