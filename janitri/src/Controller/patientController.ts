import { Request,Response } from "express";
import pool from "../Config/db";

export const getPatients=async(req:Request,res:Response)=>{
    try{
        const {rows}=await pool.query("SELECT * FROM patients")
        res.json(rows)

    }catch(error){
        res.status(500).json({ error: "Failed to fetch patient" });
    }
}
export const addPatient=async(req:Request,res:Response)=>{
    try{
        const {userId,name,age,gender}=req.body;
        const {rows}=await pool.query("INSERT INTO patients (user_id,name,age,gender) VALUES ($1 ,$2,$3,$4) RETURNING *",[userId,name,age,gender])
        res.status(200).json(rows[0])


    }catch(error){
        console.error("Database Query Error:", error);
        res.status(500).json({ error: "Failed to add patient" });


    }
}
export const deletePatient=async(req:Request,res:Response)=>{
    try{
        const id =req.params
        await pool.query("UPDATE patients SET deleted_at = NOW() WHERE id = $1", [id]);
        res.status(200).json({msg:"Patient Deleted successfully"})
    }catch(error){
        console.error("Database Query Error:", error);
        res.status(500).json({ error: "Failed to delete patient" });

    }
}