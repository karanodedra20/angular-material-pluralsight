import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';

@Component({
  selector: 'app-toolbaar',
  templateUrl: './toolbaar.component.html',
  styleUrls: ['./toolbaar.component.scss'],
})
export class ToolbaarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleDir = new EventEmitter<void>();

  constructor(
    private dailog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  openAddDialogContact() {
    let dialogRef = this.dailog.open(NewContactDialogComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);

      if (result) {
        this.openSnackBar('Contact Added', 'Navigate')
          .onAction()
          .subscribe(() => {
            this.router.navigate(['/contactmanager', result.id]);
          });
      }
    });
  }

  openSnackBar(
    message: string,
    action: string
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
