import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

const ELEMENT_DATA: Customer[] = [
  { name: 'Ngo Bao Toan', phone: '', email: '', note: '' },
  { name: 'Ngo Bao Toan', phone: '', email: '', note: '' },
  { name: 'Ngo Bao Toan', phone: '', email: '', note: '' }
];

@Component({
  selector: 'app-customer-management-main',
  templateUrl: './customer-management-main.component.html',
  styleUrls: ['./customer-management-main.component.scss']
})
export class CustomerManagementMainComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'phone', 'email', 'note'];
  dataSource = new MatTableDataSource<Customer>(ELEMENT_DATA);
  panelOpenState = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}

export interface Customer {
  name: string;
  phone: string;
  email: string;
  note: string;
}
