import { Gallery } from "./gallery";

export interface Approver {
    $key?:string;
    email:string;
    titleName:string;
    firstName:string;
    lastName:string;
    pictureProfile:string;
    jobPosition:string;
    statust:boolean;
    token:string;
    sort:number;
    gallery?:Gallery[];
}