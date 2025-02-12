import { Request,Response } from "express";
import pool from "../Config/db";

export const getHeartRateRecords=async(req:Request,res:Response)=>{
    try{
        const {patientId}=req.params;
        const {rows}=await pool.query("SELECT * FROM heart_rate_records WHERE patient_id = $1 AND deleted_at IS NULL",
      [patientId])
        res.json(rows)

    }catch(error){
        res.status(500).json({ error: "Failed to fetch hreat reate records" });
    }
}
export const addHeartRateRecord=async(req:Request,res:Response)=>{
    try{
        const {patientId,heartRate}=req.body;
        const {rows}=await pool.query("INSERT INTO heart_rate_records (patient_id, heart_rate) VALUES ($1, $2) RETURNING *",
        [patientId, heartRate])
        res.status(201).json(rows[0])


    }catch(error){
        console.error("Database Query Error:", error);
        res.status(500).json({ error: "Failed to add heart rate record" });


    }
}
export const deleteHeartRateRecord=async(req:Request,res:Response)=>{
    try{
        const {id} =req.params
        await pool.query("UPDATE heart_rate_records SET deleted_at = NOW() WHERE id = $1", [id]);
        res.status(200).json({msg:"heart rate record  Deleted successfully"})
    }catch(error){
        console.error("Database Query Error:", error);
        res.status(500).json({ error: "Failed to delete heart rate record" });

    }
}