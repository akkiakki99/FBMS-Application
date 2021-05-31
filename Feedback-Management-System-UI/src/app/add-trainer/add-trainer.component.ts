import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-add-trainer',
  templateUrl: './add-trainer.component.html',
  styleUrls: ['./add-trainer.component.css']
})
export class AddTrainerComponent implements OnInit {

  employeeIdfc : FormControl;
  employeeNamefc : FormControl;
  employeeRolefc : FormControl;
  empSkillfc : FormControl;
  employeePasswordfc : FormControl;
  alert:boolean = false

  empForm : FormGroup;
  
  roles : string[];
  skills : string[];
  // id : string[];
  
  isEditing : boolean;

  constructor(private empsService : EmployeeService, private router : Router,
    private activatedRoute : ActivatedRoute) { 
    this.employeeIdfc = new FormControl('0');
    this. employeeNamefc = new FormControl(null, [Validators.required, Validators.minLength(3)]);
    this.employeePasswordfc = new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]);
    this.employeeRolefc = new FormControl('Coordinator');
    this.empSkillfc = new FormControl('Java');
 
    this.isEditing = false;

    this.empForm = new FormGroup({
      employeeId : this.employeeIdfc,
      employeeName : this. employeeNamefc,
      employeePassword : this.employeePasswordfc,
      employeeRole : this.employeeRolefc,
      empSkill : this.empSkillfc
    });

    this.roles = ["Coordinator"]
    this.skills = ["Java","C","Pyhton","iOS","AngularJS","ReactJS","Networking","C++"]
    // this.id = ["0"]
    
    }

    ngOnInit(): void {
      let eid = this.activatedRoute.snapshot.params.eid;
      if (eid) {
        this.isEditing = true;
        this.empsService.getById(eid).subscribe(
          (data) => this.empForm.setValue(data)
        );
      }
    } 
    
   
    handleSubmit() {
      let obr = null;
      if (this.isEditing) {
        obr = this.empsService.update(this.empForm.value);
      } else {
        obr = this.empsService.add(this.empForm.value);
      }
      obr.subscribe(
        this.empForm.reset()
        );
        this.alert = true
      }
      closeAlert(){
        this.alert = false
      }
}
