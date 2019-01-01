import { Component, OnInit, Inject } from '@angular/core';
import { DialogType } from '../../models/dialog-type';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  type: string;
  title: string;
  message: string;
  inputField: string;
  maxLengthInputField: number;

  dialogType = DialogType;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.type = data.type;
    this.title = data.title;
    this.message = data.message;
    this.inputField = data.inputField;
    this.maxLengthInputField = data.maxLengthInputField;
  }

  ngOnInit() {
  }

}
