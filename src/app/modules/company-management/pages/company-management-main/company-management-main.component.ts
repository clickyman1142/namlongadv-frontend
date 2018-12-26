import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

const ELEMENT_DATA: Company[] = [
  { name: 'Nguyen Van A', phone: '', email: '', contactPerson: 'Nguyen Van B' },
  { name: 'Nguyen Van A', phone: '', email: '', contactPerson: 'Nguyen Van B' },
  { name: 'Nguyen Van A', phone: '', email: '', contactPerson: 'Nguyen Van B' }
];

@Component({
  selector: 'app-company-management-main',
  templateUrl: './company-management-main.component.html',
  styleUrls: ['./company-management-main.component.scss']
})
export class CompanyManagementMainComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'phone', 'email', 'contactPerson'];
  dataSource = new MatTableDataSource<Company>(ELEMENT_DATA);
  panelOpenState = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}

export interface Company {
  name: string;
  phone: string;
  email: string;
  contactPerson: string;
}

