import { setupServer, stopServer } from "./server.js";
import { selectMenu } from "./inquirer/inquirer-utils.js";
import inquirerConfigs from "./inquirer/inquirer-config.js";
import { startAuthFlow, refreshAuthFlow } from "./airtable/oauth.js";
import { createRecords } from "./airtable/api.js";
import 'dotenv/config'

let menuChoice = "";

setupServer();
while(menuChoice !== "exit") {
    menuChoice = await selectMenu(inquirerConfigs.mainMenuConfig);
    switch (menuChoice) {
        case "login":
            try {
                if(!process.env.AIRTABLE_ACCESS_TOKEN){
                    await startAuthFlow();
                } else {
                    console.log("Token already exists");
                }
            } catch (error) {
                console.log(error);
            }
            break;
        case "refresh-login":
            try {
                if(process.env.AIRTABLE_ACCESS_TOKEN){
                    await refreshAuthFlow();
                } else {
                    console.log("No token to refresh");
                }
            } catch (error) {
                console.log(error);
            }
            break;
        case "createRecord":
            await createRecords();
            break;
        case "exit":
            stopServer();
            menuChoice = "exit"
            break;
        default:
            break;
    }
}
