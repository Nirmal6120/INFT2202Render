// Author: Nirmal Patel, Jalpan Patel
// date: 13/04/2025
"use strict";
//Import necessary modules and types
import express from "express";
import path from 'path';
import { fileURLToPath } from "url";
import contactRoutes from "./contactRoutes.js";
//Convert module path to dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//Initialize Express
const app = express();
const port = process.env.PORT || 3001;
async function startServer() {
    try {
        app.listen(port, () => {
            console.log(`[INFO] Server is running on: http://localhost:${port}`);
        });
    }
    catch (error) {
        console.error(`[INFO] Failed to start node server`);
        process.exit(1);
    }
}
//Middleware to parse incoming JSON payloads
app.use(express.json());
//Serve static file (HTML, CSS etc...) from the project root
app.use(express.static(path.join(__dirname, '../..')));
//Serve more static file from node_module for client-side use (map)
app.use("/node_modules/@fortawesome/fontawesome-free", express.static(path.join(__dirname, '../../node_modules/@fortawesome/fontawesome-free')));
app.use("/node_modules/bootstrap", express.static(path.join(__dirname, '../../node_modules/bootstrap')));
//Mount all contact endpoints to path/api/contacts
app.use('/api/contacts', contactRoutes);
const users = [
    {
        "DisplayName": "Nirmal Patel",
        "EmailAddress": "Nirmal@gmail.com",
        "Username": "Npatel",
        "Password": "123456"
    },
    {
        "DisplayName": "Kirtan Patel",
        "EmailAddress": "Kirtan@gmail.com",
        "Username": "Kpatel",
        "Password": "123456"
    }
];
//Route to server the home page / landing page of our SPA (index.html)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'index.html'));
});
//http://localhost:3000/users
app.get('/users', (req, res) => {
    res.send({ users });
});
//Start the server
await startServer();
//# sourceMappingURL=server.js.map