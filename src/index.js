import dotenv from "dotenv"
import connectDB from "./db/index.js";
import app from "./app.js";
import cookieParser from "cookie-parser";

dotenv.config();

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000,()=>{
    console.log(`Server is running at PORT: ${process.env.PORT}`)
    });

    app.on('error', (error)=>{
        console.log(`Error in running App: `, error)
        throw error;
    })

})
.catch((err) => {
    console.log("MongoDB connection Failed !!!" , err)
})
