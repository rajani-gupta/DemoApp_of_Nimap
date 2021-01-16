import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DemoService } from '../demo.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  profileForm: FormGroup;
  isHome: boolean;
  isCompany: boolean;
  id: number;
  imageURL: string;
  uploadedFiles: Array<File>;

  constructor(
    private fb: FormBuilder,
    private demoService: DemoService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      contact: [''],
      age: [''],
      state: [''],
      country: [''],
      address: [''],
      address1: [''],
      address2: [''],
      tags: [''],
      isChecked: [''],
    });


  }

  getIdByUrl() {
    this._route.params.subscribe((data) => {
      this.id = data.id
    })
  }



  onHandleChange(event) {
    let value = event.target.value
    if (value == 'Home') {
      this.isHome = true;
      this.isCompany = false;
    } else {
      this.isCompany = true;
      this.isHome = false;
    }
  }

  onSubmit() {
    let formValue = this.profileForm.getRawValue();
    let formData = new FormData();
    for (let val in formValue) {
      formData.append(val, formValue[val])
    }
    console.log('this is the format data::', formData);
    formData.append("uploads", this.uploadedFiles[0], this.uploadedFiles[0].name);

    console.log('this is the format data::', formData);


    this.demoService.createProfile(formData).subscribe((data) => {
      this._router.navigate(['profile'])

    })
  }

  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.uploadedFiles = event.target.files;
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  fileChange(element) {
    this.uploadedFiles = element.target.files;
  }







}
