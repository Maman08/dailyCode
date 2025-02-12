import { Request,Response } from "express";
import pool from "../Config/db";

export const getAllUsers=async(req:Request,res:Response)=>{
    try{
        const {rows}=await pool.query("SELECT * FROM users")
        res.json(rows)

    }catch(error){
        res.status(500).json({ error: "Failed to fetch users" });
    }
}
export const addUser=async(req:Request,res:Response)=>{
    try{
        const {name,email,password,role}=req.body;
        const {rows}=await pool.query("INSERT INTO users (name,email,password,role) VALUES ($1 ,$2,$3,$4) RETURNING *",[name,email,password,role])
        res.status(200).json(rows[0])


    }catch(error){
        console.error("Database Query Error:", error);
        res.status(500).json({ error: "Failed to add user" });


    }
}
export const deleteUser=async(req:Request,res:Response):Promise<any>=>{
    try{
        const {id} =req.params
        
        await pool.query("UPDATE users SET deleted_at = NOW() WHERE id = $1", [id]);
        res.status(200).json({msg:"User Deleted successfully"})
    }catch(error){
        console.error("Database Query Error:", error);
        res.status(500).json({ error: "Failed to delete user" });

    }
}

export const permanentDelteUser=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        await pool.query(`DELETE FROM users WHERE id=$1`,[id]);
        res.status(200).json({msg:"User Delete from db"})

    }catch(error){
        console.error("Database query error:",error)
        res.status(500).json({error:"Failed permanent delete of user"});

    }
}

export const updateUser=async(req:Request, res:Response):Promise<any>=>{
    try {
        const {id}=req.params;
        const {name,email,password,role}=req.body;

       

        const updateFields: string[]=[];
        const values:any[]=[];
        let paramIndex=1;

        if(name){
            updateFields.push(`name = $${paramIndex++}`);
            values.push(name);
        }
        if(email){
            updateFields.push(`email = $${paramIndex++}`);
            values.push(email);
        }
        if(password){
            updateFields.push(`password = $${paramIndex++}`);
            values.push(password);
        }
        if(role){
            updateFields.push(`role = $${paramIndex++}`);
            values.push(role);
        }

        if(updateFields.length ===0){
            return res.status(400).json({ msg: "No fields to update" });
        }

        values.push(id);

        const query =`UPDATE users SET ${updateFields.join(", ")} WHERE id = $${paramIndex} RETURNING *`;
        const {rows}=await pool.query(query, values);

        res.status(200).json(rows[0]);
    }catch(error){
        console.error("Database Query Error:", error);
        res.status(500).json({ error: "Failed to update user" });
    }
};
