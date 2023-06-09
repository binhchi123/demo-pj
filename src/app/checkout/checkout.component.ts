import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  listCart: any = [];
  constructor(private app: AppService) { }
  formCheckout = new FormGroup({
    email: new FormControl('', [
      Validators.required
    ]),
    name: new FormControl('', [
      Validators.required
    ]),
    address: new FormControl('', [
      Validators.required
    ]),
    message: new FormControl('', [
      Validators.required
    ])
  })

  ngOnInit(): void {
    this.listCart = this.app.items;
    console.log(this.listCart);
  }

  get form(): any {
    return this.formCheckout.controls;
  }

  handlePostCheckout(data: any): any {
    const postData: any = {
      account_id: '3',
      carts: data
    }
    console.log(postData);

    this.app.postCheckout(postData).subscribe((res) => {
      console.log(res);
    })
  }

}
