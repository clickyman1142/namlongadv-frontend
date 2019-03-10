import { Component, OnInit, Inject } from '@angular/core';
import { DiffAdvert } from '../compare-table/compare-table.component';
import { MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-compare-dialog',
  templateUrl: './compare-dialog.component.html',
  styleUrls: ['./compare-dialog.component.scss']
})
export class CompareDialogComponent implements OnInit {
  diffAdvs: DiffAdvert[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private translate: TranslateService) { }

  ngOnInit() {
    this.compare();
  }

  compare() {
    if (this.data.length < 2) {
      return;
    }
    const exclude = ['createdBy', 'updatedBy', 'id', 'updatedDate'];
    this.data.forEach((prevAdv, index) => {
      if (index >= this.data.length - 1) {
        return;
      }
      const currAdv = this.data[index + 1];
      const diffAdv = {
        updatedDate: prevAdv.updatedDate,
        data: [],
        createdBy: currAdv.createdBy.name,
        modBy: currAdv.updatedBy.name
      };
      Object.keys(prevAdv).forEach(key => {
        if (prevAdv[key] !== currAdv[key] && exclude.indexOf(key) === -1) {
          diffAdv.data.push({
            fieldName: this.translate.instant(`advert.form.${key}`),
            oldInfo: prevAdv[key],
            newInfo: currAdv[key]
          });
        }
      });

      this.diffAdvs.push(diffAdv);
    });
  }

}
