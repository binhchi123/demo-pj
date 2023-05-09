import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }
  formData = new FormGroup({
    email: new FormControl('', [
      Validators.required
    ]),
    name: new FormControl('', [
      Validators.required
    ]),
    message: new FormControl('', [
      Validators.required
    ])
  })

  ngOnInit(): void {
  }
  
  get form(): any {
    return this.formData.controls;
  }

}
