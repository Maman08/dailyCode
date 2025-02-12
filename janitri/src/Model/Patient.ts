export interface Patient{
    id:string;
    userId:string;
    name:string;
    age:number;
    gender:'Male' | 'Female' | 'Other';
    createdAt?:Date;
    deletedAt?:Date | null;

}