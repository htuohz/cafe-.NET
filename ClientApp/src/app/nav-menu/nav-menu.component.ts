import { Component, NgModule } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartComponent } from './cart/cart.component';
import { RegistrationComponent } from '../user/registration/registration.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})

@NgModule({
  imports: [],
  declarations: [CartComponent],
  exports: [CartComponent],
  entryComponents: [CartComponent]
})
export class NavMenuComponent {
  isExpanded = false;
  hasToken:any = undefined
  constructor(public dialog: MatDialog, private userService: UserService) {
    this.userService.tokenValue.subscribe((nextValue)=>{
      if(nextValue!=undefined){
        this.hasToken = true;
      }
    })
  }
  ngOnInit(): void {

  }

  collapse() {
    this.isExpanded = false;
  }
  openDialog() {
    const dialogRef = this.dialog.open(CartComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  onLogout(){
    localStorage.setItem('token',undefined);
    this.hasToken = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
