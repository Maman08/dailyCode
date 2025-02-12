export interface Patient{
    id:string;
    user_id:string;
    name:string;
    age:number;
    gender:'Male' | 'Female' | 'Other';
    createdAt?:Date;
    deletedAt?:Date | null;

}