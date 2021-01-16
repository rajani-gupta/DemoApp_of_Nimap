import { Component, OnInit } from '@angular/core';
import { DemoService } from '../demo.service';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  getProfileData: any;
  constructor(private demoService: DemoService,) {
    this.getProfileData = [];
   }

  ngOnInit(): void {
    this.getProfile();


  }
  getProfile() {
    this.demoService.getProfile().subscribe((data) => {
      this.getProfileData = data;
    })
  }
 

}
