import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address-conflict-dialog',
  templateUrl: './address-conflict-dialog.component.html',
  styleUrls: ['./address-conflict-dialog.component.scss']
})
export class AddressConflictDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddressConflictDialogComponent>,
    private router: Router
  ) { }

  ngOnInit() {
  }

  redirect(advId, event) {
    event.preventDefault();
    this.dialogRef.close(false);
    this.router.navigate(['/adv-management/' + advId]);
  }

}
