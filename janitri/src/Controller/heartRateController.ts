import { Request,Response } from "express";
import pool from "../Config/db";

// export const getHeartRateRecords=async(req:Request,res:Response):Promise<any>=>{
//     try{
//         const {patientId}=req.params;
//         if (!patientId) {
//             return res.status(400).json({ error: "patientId is required" });
//         }
//         const {rows}=await pool.query("SELECT * FROM heart_rate_records WHERE patient_id = $1 AND deleted_at IS NULL",
//       [patientId])
//         res.json(rows)

//     }catch(error){
//         res.status(500).json({ error: "Failed to fetch hreat reate records" });
//     }
// }


export const getHeartRateRecords = async (req: Request, res: Response): Promise<any> => {
    try {
        const {patientId} = req.params;
        if (!patientId) {
            return res.status(400).json({ error: "patientId is required" });
        }
        const { rows } = await pool.query(
            `SELECT 
                p.id AS patient_id, p.name, p.age, p.gender, 
                json_agg(
                    json_build_object(
                        'recordId', hr.id,
                        'heartRate', hr.heart_rate,
                        'recordedAt', hr.recorded_at
                    )
                ) AS heart_rate_records
             FROM patients p
             LEFT JOIN heart_rate_records hr ON p.id = hr.patient_id AND hr.deleted_at IS NULL
             WHERE p.id = $1 AND p.deleted_at IS NULL
             GROUP BY p.id, p.name, p.age, p.gender`,
            [patientId]
        );

        if (rows.length === 0) {
            return res.json({ patient_id: patientId, heart_rate_records: [] });
        }
        

        res.json(rows[0]);

    } catch (error) {
        console.error("Database Query Error:", error);
        res.status(500).json({ error: "Failed to fetch heart rate records" });
    }
};

export const addHeartRateRecord=async(req:Request,res:Response):Promise<any>=>{
    try{
        const {patientId,heartRate}=req.body;
        if(!patientId || !heartRate){
            return res.status(400).json({ error: "patientId and heartRate are required" });
        }
        const {rows}=await pool.query("INSERT INTO heart_rate_records (patient_id, heart_rate) VALUES ($1, $2) RETURNING *",
        [patientId, heartRate])
        res.status(201).json({
            message: "Heart rate record added successfully",
            data: rows[0],
        });


    }catch(error){
        console.error("Database Query Error:", error);
        res.status(500).json({ error: "Failed to add heart rate record" });


    }
}
export const deleteHeartRateRecord=async(req:Request,res:Response):Promise<any>=>{
    try{
        const {id} =req.params
        if(!id){
            return res.status(400).json({ error: "id is required" });
        }
        await pool.query("UPDATE heart_rate_records SET deleted_at = NOW() WHERE id = $1", [id]);
        res.status(200).json({msg:"heart rate record  Deleted successfully"})
    }catch(error){
        console.error("Database Query Error:", error);
        res.status(500).json({ error: "Failed to delete heart rate record" });

    }
}






