import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AdvertService } from '../../shared/advert.service';
import { Spinner } from 'src/app/shared/services/spinner.service';

@Component({
  selector: 'app-adv-management-main',
  templateUrl: './adv-management-main.component.html',
  styleUrls: ['./adv-management-main.component.scss']
})
export class AdvManagementMainComponent implements OnInit {

  displayedColumns: string[] = ['position', 'code', 'title', 'address', 'size', 'createdDate', 'subTitle', 'contact', 'images'];
  dataSource: MatTableDataSource<any>;
  panelOpenState = false;
  pageSizeOptions = [10, 50, 100, 500, 1000, 5000, 10000];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private advertService: AdvertService,
    private spinner: Spinner
  ) {}

  ngOnInit() {
    this.spinner.show();
    const searchForm = {
      code: null,
      address: null,
      createdBy: null,
      contactPerson: null,
      houseNo: null,
      street: null,
      ward: null,
      district: null,
      provinceCode: null,
      title: null,
      from: '2018-01-01T13:59:26.456Z',
      to: '2019-01-01T13:59:26.456Z',
      pageRequestDTO: {
        page: 0,
        size: 30
      },
      roles: []
    };
    this.advertService.getAll(searchForm).subscribe(res => {
      this.dataSource = new MatTableDataSource<any>(res.data.data);
      this.dataSource.paginator = this.paginator;
      this.spinner.hide();
    });
  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
