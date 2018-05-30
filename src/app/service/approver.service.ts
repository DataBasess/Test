import { Injectable } from '@angular/core';
import { Approver } from '../model/Approver';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { FirebaseListFactoryOpts } from 'angularfire2/database-deprecated/interfaces';

@Injectable()
export class ApproverService {

  approver:Approver;
  Num_object:number;
  statust:boolean;
  opt:FirebaseListFactoryOpts;
 
  constructor(
    private database:AngularFireDatabase
  ) { }

  saveApprover(email:string,uid:string){
    //user.sort = this.countUser();
    let numObject =  this.getNum_object();
    this.approver = {
      email:email,
      titleName:' ',
      firstName:' ',
      lastName:' ',
      jobPosition:' ',
      pictureProfile:' ',
      statust:true,
      token:' ',
      sort: numObject,
      gallery:[]
    }
    return this.database.object('approver/'+uid).set(this.approver);
  }

  getApproverList():FirebaseListObservable<Approver[]>{
    return this.database.list('approver/',);
  }

  getApprover(key:string):FirebaseObjectObservable<Approver>{
    return this.database.object('approver/'+key);
  }

  updateApprover(key:string,approver:Approver){
    return this.database.object('approver/'+key).update(approver);
  }

  removeApprover(key:string){
    return this.database.list('approver/').remove(key);
  }


  getNum_object(){
    this.database.list('approver/').subscribe(list=>{
      let Num_object =  list.length;
      this.Num_object = Num_object + 1;
      //console.log(this.Num_object);
      
    });
    return this.Num_object;
  }

  changStatus(key:string,status:boolean){
    console.log(key,status);    
    status != true?this.statust = true:this.statust = false;
    return this.database.object('approver/'+key+'/statust').set(this.statust);
  }

  sortObject(key:string,sort:number){
    console.log('sort',sort);    
    return this.database.object('approver/'+key+'/sort').set(sort);
  }

}
