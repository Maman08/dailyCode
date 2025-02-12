export interface HeartRateRecord{
    id:string;
    patientId:string;
    heartRate:number;
    recordedAt?:Date;
    deletedAt?:Date|null;
}