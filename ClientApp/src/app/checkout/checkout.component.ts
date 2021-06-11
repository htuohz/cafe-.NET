import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../services/order.service';
import { AddressService } from '../services/address.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Address } from '../shared/address';
import { CartService, DishItem } from '../services/cart.service';
import { DishOrder,Order } from '../shared/order';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  addressForm: FormGroup;
  address: Address;
  addressId: number;
  errMess:string;
  storedAddresses: Address[] = [];
  dishItems: DishItem[] = [];
  totalSum: Number = 0;
  @ViewChild('aform',{static: false}) addressFormDirective;
  formErrors = {
    fullname: '',
    street: '',
    suburb: '',
    state: '',
    phone: '',
  };

  validationMessages = {
    fullname:{
      required:'Please enter your full name'
    },
    street:{
      required:'Please enter your street'
    },
    suburb:{
      required:'Please enter your suburb'
    },
    state:{
      required:'Please enter your state'
    },
    phone:{
      required:'Please enter your phone'
    }
  };

  createForm(){
    this.addressForm = this.fb.group({
      fullname:['',[Validators.required]],
      street:['',[Validators.required]],
      suburb:['',[Validators.required]],
      state:['',[Validators.required]],
      phone:['',[Validators.required]],
    });

    this.addressForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();// (re)set form validation messages
  }
  onValueChanged(data?: any): void {
    if(!this.addressForm){return; }
    const form = this.addressForm;
    for(const field in this.formErrors){
      if (this.formErrors.hasOwnProperty(field)){
        //clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages = this.validationMessages[field];
          for (const key in control.errors){
            if (control.errors.hasOwnProperty(key)){
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  constructor(private orderServie: OrderService,
    private addressService: AddressService,
    private fb: FormBuilder,
    private cartService: CartService) {

     }




  ngOnInit() {
    this.createForm();
    this.getAddresses();
    this.cartService.getItems()
      .subscribe(res => this.dishItems = res);
    this.updateSum();
    this.address = this.addressForm.value;



  }

  onCheckout(){
    let order:Order = {
      addressId:this.addressId,
      dishOrders:[]
    };
    console.log(this.dishItems);
    this.dishItems.forEach(element => {
      let dishOrder = <DishOrder>({
        DishId: element.dish.dishId,
        Quantity: element.count
      });
      order.dishOrders.push(dishOrder);
    });
    if(this.addressId!=0){
      order.addressId = this.addressId;
      this.orderServie.submitOrder(order)
      .subscribe(
        (res:any)=>{
          console.log(res);
        },
        err =>{
          console.log(err);
        }
      );
    }

  }

  onSelectChange(event){
    this.addressId = event.target.value;
  }

  addAddress(){
    this.address = this.addressForm.value;
    this.address.phone = Number(this.address.phone);
    console.log(this.address);
    this.addressService.AddAdress(this.address)
      .subscribe(res => {
        this.getAddresses();
        return;
      },
      errmess => {
        this.errMess = <any>errmess
      });

  }

  getAddresses(){
    this.addressService.GetAdresses()
    .subscribe(res => {
      this.storedAddresses = res;
      console.log(this.storedAddresses);
    },
    errmess => {
      throw errmess;
    })
  }
  updateSum(){
    this.totalSum = this.dishItems.reduce<number>((a,b)=>{
      return a+b.total;
    },0)
  }


}



