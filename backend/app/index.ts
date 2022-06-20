import app from "./app";
import * as dotenv from 'dotenv';

dotenv.config({path:`${__dirname}/.env`});
let port = 3200;
app.listen(port, () => {
    console.log(`{ defaultUrl: http://localhost:${port} }`);
});