import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AutocompleteService } from './service/autocomplete.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  @Input() options: any[];
  @Input() fieldLabel: string;
  @Input() keyField: string;
  @Input() valueField: string;
  @Input() remote: string;
  @Input() displayFields: string[];
  @Output() changes = new EventEmitter();

  autocompleteControl: FormControl = new FormControl();
  filteredOptions: Observable<string[]>;

  constructor(private autocompleteService: AutocompleteService) {}

  ngOnInit() {
    if (this.remote) {
      this.autocompleteControl.valueChanges.subscribe(value => {
        this._filterFromRemote(value).subscribe(rs => {
          this.filteredOptions = of(rs.data.data.map(r => {
            const display = this.displayFields.map(field => r[field]).join(', ');
            return display;
          }));
        });
      });
    } else {
      this.filteredOptions = this.autocompleteControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    }
    this.autocompleteControl.valueChanges.subscribe(val => {
      this.changes.emit(val);
    });
  }

  private _filterFromRemote(value: string) {
    const filter = [{
      key: this.keyField,
      operation: 'LIKE',
      value: value
    }];
    return this.autocompleteService.filter(this.remote, JSON.stringify(filter));
  }

  private _filter(value: string): string[] {
    const filterValue = this.removeVietnamseSign(value.toLowerCase());
    return this.options &&
      this.options.filter(option => this.removeVietnamseSign(option[this.keyField].toLowerCase()).includes(filterValue));
  }

  removeVietnamseSign(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    return str;
}

}
