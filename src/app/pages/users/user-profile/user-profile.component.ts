import { Component, OnInit } from '@angular/core';

type UserFields = "id" | "name" | "email" | "phoneNumber" | "disable";
type FormErrors = { [u in UserFields]: string };


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
