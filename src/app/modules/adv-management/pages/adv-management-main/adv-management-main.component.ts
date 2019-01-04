import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AdvertService } from '../../shared/advert.service';
import { Spinner } from 'src/app/shared/services/spinner.service';
import { SelectionModel } from '@angular/cdk/collections';
import * as _moment from 'moment';

@Component({
  selector: 'app-adv-management-main',
  templateUrl: './adv-management-main.component.html',
  styleUrls: ['./adv-management-main.component.scss']
})
export class AdvManagementMainComponent implements OnInit {
  _moment = _moment;

  displayedColumns: string[] = ['select', 'position', 'code', 'title', 'address',
    'size', 'createdDate', 'subTitle', 'contact', 'images'];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  panelOpenState = false;
  pageSizeOptions = [10, 50, 100, 500, 1000, 5000, 10000];
  totalOfPages = 0;
  Object = Object;
  today = new Date();

  searchCriterias = {
    code: {
      key: 'code',
      operation: 'LIKE',
      value: '',
      title: 'Mã'
    },
    advCompNameSearching: {
      key: 'advCompNameSearching',
      operation: 'LIKE',
      value: '',
      title: 'Tên công ty'
    },
    createdBy: {
      key: 'createdBy',
      operation: 'EQUALITY',
      value: '',
      title: 'Người tạo'
    },
    addressSearching: {
      key: 'addressSearching',
      operation: 'LIKE',
      value: '',
      title: 'Địa chỉ'
    },
    titleSearching: {
      key: 'titleSearching',
      operation: 'LIKE',
      value: '',
      title: 'Tiêu đề'
    },
    houseNoSearching: {
      key: 'houseNoSearching',
      operation: 'EQUALITY',
      value: '',
      title: 'Số nhà'
    },
    streetSearching: {
      key: 'streetSearching',
      operation: 'EQUALITY',
      value: '',
      title: 'Tên đường'
    },
    wardSearching: {
      key: 'wardSearching',
      operation: 'EQUALITY',
      value: '',
      title: 'Phường'
    },
    districtSearching: {
      key: 'districtSearching',
      operation: 'EQUALITY',
      value: '',
      title: 'Quận'
    },
    provinceSearching: {
      key: 'provinceSearching',
      operation: 'EQUALITY',
      value: '',
      title: 'Tỉnh'
    }
  };
  dateRange = {
    start: _moment('2018-01-01', 'YYYY-MM-DD').toDate(),
    end: this.today
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private advertService: AdvertService,
    private spinner: Spinner
  ) {}

  ngOnInit() {
    this.buildDataTable(true);
  }

  buildDataTable(initPaginator?: boolean) {
    const page = this.paginator.pageIndex ? this.paginator.pageIndex : 0;
    const size = this.paginator.pageSize ? this.paginator.pageSize : 10;
    this.spinner.show();
    this.advertService.getAll(this.buildSearchCriteria(), page + 1, size).subscribe(res => {
      this.totalOfPages = res.data.count;
      this.dataSource = new MatTableDataSource<any>(res.data.data);
      if (initPaginator) {
        this.paginator.pageIndex = 0;
        this.dataSource.paginator = this.paginator;
      }
      this.spinner.hide();
    });
  }

  buildSearchCriteria() {
    const searchCriterias = Object.keys(this.searchCriterias).filter(key => {
      return this.searchCriterias[key].value !== '';
    }).map(key => {
      return this.searchCriterias[key];
    });
    searchCriterias.push({
      key: 'createdDate',
      operation: 'BETWEEN',
      value: JSON.stringify({
        start: _moment(this.dateRange.start).format('DD/MM/YYYY'),
        end: _moment(this.dateRange.end).format('DD/MM/YYYY')
      })
    });
    return searchCriterias;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
