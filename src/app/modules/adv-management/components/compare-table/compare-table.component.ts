import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-compare-table',
  templateUrl: './compare-table.component.html',
  styleUrls: ['./compare-table.component.scss']
})
export class CompareTableComponent implements OnInit {
  @Input() diffAdvs: DiffAdvert[] = [];
  DATATYPE = {
    OLD: 'old',
    NEW: 'new'
  };

  displayedColumns: string[] = [
    'updatedDate', 'oldInfo', 'newInfo', 'createdBy', 'modBy'
  ];

  constructor() { }

  ngOnInit() {
  }

  private showInfo(data: Info[], type) {
    let content = '';
    data.forEach(item => {
      content = content.concat(`<li>${item.fieldName}: ${type === this.DATATYPE.OLD ? item.oldInfo : item.newInfo}</li>`);
    });
    return `<ul>${content}</ul>`;
  }

}

export interface DiffAdvert {
  updatedDate: number;
  data: Info[];
  createdBy: string;
  modBy: string;
}

export interface Info {
  fieldName: string;
  oldInfo: string;
  newInfo: string;
}
