export interface HeartRateRecord{
    id:string;
    patient_id:string;
    heart_rate:number;
    recorded_at:Date;
    deleted_at:Date|null;
}