import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef} from "@angular/material";
import { OrderItem } from 'src/app/shared/order-item.model';
import { ItemService } from 'src/app/shared/item.service';
import { Item } from 'src/app/shared/item.model';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styles: []
})
export class OrderItemsComponent implements OnInit {
fromData:OrderItem;
itemList:Item[];
isValid:boolean=true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef:MatDialogRef<OrderItemsComponent>,
    private itemService:ItemService,
    private orderService:OrderService
  ) { }

  ngOnInit() {
this.itemService.getItemList().then(res=> {console.log(res), this.itemList =res as Item[]});
//  this.itemService.getItemList().then(val=>{console.log('promise: ',val);
//  });

    this.fromData={
      OrderItemID:null,
      OrderID:this.data.OrderID,
      ItemID:0,
      ItemName:'',
      Price:0,
      Quantity:0,
      Total:0
    }
  }

  updatePrice(ctrl){
    if (ctrl.selectedIndex==0) {
      this.fromData.Price=0;
      this.fromData.ItemName='';
    }
    else {
      this.fromData.Price=this.itemList[ctrl.selectedIndex-1].Price;
      this.fromData.ItemName=this.itemList[ctrl.selectedIndex-1].Name;

    }
    this.updateTotal(); 
  }

  updateTotal(){
    this.fromData.Total= parseFloat((this.fromData.Price * this.fromData.Quantity).toFixed(2));
  }

  onSubmit(form:NgForm){
    console.log(this.validateForm(form.value));
    // console.log("After  "+this.fromData.ItemID);
    
    if (this.validateForm(form.value)) {
      console.log("hiiiiii");
      debugger;
     this.orderService.orderItems.push(form.value);
     this.dialogRef.close();
  }
}
  validateForm(fromData:OrderItem){
      this.isValid=true;
   if (fromData.ItemID==0) {
      this.isValid=false;
    }
  else if (fromData.Quantity==0) {
    this.isValid=false;
    return this.isValid;
  }
 
  }
}
