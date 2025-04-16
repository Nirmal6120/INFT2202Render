"use strict"

import express , {Request,Response} from "express";
import Database from "./database.js";



const router = express.Router();



interface Contact{
    id : string
    fullName:string;
    contactNUmber: string;
    emailAddress:string;
}





router.get('/', async(req : Request, res : Response) => {
  try{
      const db = await Database.getInstance().connect();
      const contacts = await db.collection("contacts").find().toArray();
      res.json(contacts);
  }catch (error){
      console.error("[ERROR] Filed to fetch contacts", error);
      res.status(500).json({message:"Something went wrong"});
  }
});
/**
 * Retrieve a single contact
 */

router.get('/:id', async(req : Request, res : Response) => {
    try{
        const db = await Database.getInstance().connect();
        const contact = await db.collection("contacts").findOne({id:req.params.id});
        if(contact){
            res.json(contact);
        }else{
            res.status(404).json({message:"Not Found"});
        }


    }catch (error){
        console.error("[ERROR] Filed to fetch contacts", error);
        res.status(500).json({message:"Something went wrong"});
    }
});

router.post('/', async(req : Request, res : Response) => {
    try{
        const db = await Database.getInstance().connect();
        const contacts = await db.collection("contacts").find().toArray();
        const newId = contacts.length > 0 ?
            (Math.max(...contacts.map(c => parseInt(c.id))) + 1).toString(): '1';

        const newContact : Contact = {id:newId, ...req.body};
        await db.collection("contacts").insertOne(newContact);
        res.status(201).json(newContact);
    }catch (error){
        console.error("[ERROR] Filed to fetch contacts", error);
        res.status(500).json({message:"Something went wrong"});
    }
});

router.put('/:id', async(req : Request, res : Response) => {
    try{
        const db = await Database.getInstance().connect();
        const {...updateData} = req.body;
        const  result =
            await db.collection("contacts").findOneAndUpdate({id:req.params.id},{$set:updateData}, {returnDocument: 'after'});
        if(result && result.value){
            res.json(result.value);
        }else{
            const updateContact = await db.collection("contacts").findOne({id:req.params.id});
            if(updateContact){
                res.json(updateContact);
            }else{
                res.status(404).json({message:"Not Found"});
            }
        }
    }catch (error){
        console.error("[ERROR] Filed to fetch contacts", error);
        res.status(500).json({message:"Something went wrong"});
    }
});

router.delete('/:id', async(req : Request, res : Response) => {
    try{
        const db = await Database.getInstance().connect();
        const result = await db.collection("contacts").deleteOne({id:req.params.id});
        if (result.deletedCount > 0){
            res.json({message:"Deleted contact"});
        }else {
            res.status(404).json({message:"Not Found"});
        }

    }catch (error){
        console.error("[ERROR] Filed to fetch contacts", error);
        res.status(500).json({message:"Something went wrong"});
    }
});

export default router;