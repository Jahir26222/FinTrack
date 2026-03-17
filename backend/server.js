import app from "./src/app.js";
import { ConnectDB } from "./src/config/database.js";


const port = process.env.PORT

ConnectDB()

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})