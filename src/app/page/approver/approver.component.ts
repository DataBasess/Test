import { Component, OnInit, ViewContainerRef, Pipe } from '@angular/core';
import { User } from '../../model/User';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { ApproverService } from '../../service/approver.service';
import { Approver } from '../../model/Approver';
import { ToastsManager } from 'ng2-toastr';


@Component({
  selector: 'app-approver',
  templateUrl: './approver.component.html',
  styleUrls: ['./approver.component.css']
})
export class ApproverComponent implements OnInit {

  user:User = {email:'',password:''};
  key:string='';
  massage:string='';
  approver:Approver;
  approvers:Approver[];
  new_sort:number;
  old_sort:number;
  nextsort:number;

  vedios=[
    {id:"UpHHPkLkoG8"},
    {id:"UpHHPkLkoG8"},
    {id:"UpHHPkLkoG8"},
    {id:"UpHHPkLkoG8"},
    {id:"UpHHPkLkoG8"},
  ]

  link="UpHHPkLkoG8";
  
  constructor(
    private angularFireAuth:AngularFireAuth,
    public router:Router,
    private route: ActivatedRoute,
    private approverService:ApproverService,
    public toastr: ToastsManager, 
    vcr: ViewContainerRef,
  ) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.getApprovers();
    let welcome = sessionStorage.getItem('welcome');
    if(welcome=='true'){
      this.toastr.success('Welcome Admin to Approver Management.', 'Welcome!',{toastLife: 4000, showCloseButton: true});
      sessionStorage.clear();
    }
    
    
  }

  add(user:User){
    
    if(user.email!=''&&user.password!=''){
      this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email,user.password).then(user=>{

        this.approverService.saveApprover(user.email,user.uid).then(result=>{
              //this.clear();
            this.toastr.success('Save Data!', 'Success!',{toastLife: 3000, showCloseButton: true});
        }).catch(error=>{
          this.massage = error;
          console.log(this.massage);
          this.toastr.error(error.message, 'Oops!',{toastLife: 10000,showCloseButton: true});
        })      
        //this.toastr.success('Save Data!', 'Success!',{toastLife: 3000, showCloseButton: true});
      }).catch(error=>{
        this.massage = error;
        console.log(this.massage);      
        this.toastr.error(error.message, 'Oops!',{toastLife: 10000,showCloseButton: true});
        // error.message
      })
      //this.router.navigate(['/user']);
    }else{
      this.toastr.error('Please fill in the information', 'Oops!',{toastLife: 10000,showCloseButton: true});
    }

    this.user = {email:'',password:''};
    
  }


  clear(){
    this.user = {email:'',password:''};
  }

  async getApprovers(){
    await this.approverService.getApproverList().subscribe(list=>{
          
          list.filter(ob=>{
            ob.jobPosition = 'approver';
          })
          this.approvers = list.sort((a, b) => a.sort - b.sort);
          //console.log(this.approvers);          
    });
  }

  modify(approver){
    this.router.navigate(['approver-edit',{'key':approver.$key}]);
  }

  changStatus(approver){
    this.approverService.changStatus(approver.$key,approver.statust).then(res=>{console.log(res);
    }).catch(e=>{console.log(e);
    });
  }

  sortObject(new_sort:number,key){
      console.log('new_sort',new_sort,key);
      this.new_sort = new_sort;
      this.approverService.getApprover(key).subscribe(object=>{
        this.old_sort = object.sort;
      });
      if(this.new_sort > this.old_sort){
        this.approvers.forEach(approver=>{
          if(approver.sort>this.old_sort&&approver.sort<=this.new_sort&&approver.$key!=key){
            this.nextsort = approver.sort--;
            this.approverService.sortObject(approver.$key,this.nextsort);
          }
        })
      }else{
        this.approvers.forEach(approver=>{
          if(approver.sort<this.old_sort&&approver.sort>=this.new_sort&&approver.$key!=key){
            this.nextsort = approver.sort++;
            this.approverService.sortObject(approver.$key,this.nextsort);
          }
        })
      }

      this.approverService.sortObject(key,new_sort);
      this.getApprovers();
  }

  remove(approver:Approver){
    this.approverService.removeApprover(approver.$key).then(res=>{
      this.toastr.success('Remove Data!', 'Success!',{toastLife: 3000, showCloseButton: true});
    }).catch(e=>{
      this.toastr.error(e, 'Oops!',{toastLife: 10000,showCloseButton: true});
    })
  }

}
