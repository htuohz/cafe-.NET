import { Component, NgModule } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartComponent } from './cart/cart.component';
import { RegistrationComponent } from '../user/registration/registration.component';

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
  constructor(public dialog: MatDialog) {}
  collapse() {
    this.isExpanded = false;
  }
  openDialog() {
    const dialogRef = this.dialog.open(CartComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
