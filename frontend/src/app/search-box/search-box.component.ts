import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { record } from './record';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  @Output() getValue = new EventEmitter<string>();
  values: string;//搜索框的数据
  // isHasValue: boolean = false;//搜索框中是否有数据；
  isFocusInput: boolean = false;
  records: record[] = [
    { isEnter: false, data: '454897156' },
  ];

  constructor(private el: ElementRef) { }

  ngOnInit() {
    localStorage.setItem('searchRecords', JSON.stringify(this.records));
    this.getRecords();
  }

  focusInput(value: string) {
    if (value != "" && value != null) {
      this.isFocusInput = false;
    } else {
      this.isFocusInput = true;
    }
  }

  blurInput() {
    this.isFocusInput = false;
  }

  liMousedown(s: record) {
    let input = this.el.nativeElement.querySelector("#input");//得到input
    input.blur();//让input失去焦点
    this.values = s.data;
    // console.log(s.data)
    this.getValue.emit(this.values);
  }
  //键盘按钮事件
  onKey(value: string) {
    if (value != "" && value != null) {
      this.isFocusInput = false;
    } else {
      this.isFocusInput = true;
    }
    this.values = value;
  }
  //查询，弹出
  toSearch() {
    if (this.values != "" && this.values != null) {
      this.getValue.emit(this.values)
      this.newRecordInLocal({ isEnter: false, data: this.values })
    }
  }

  newRecordInLocal(n: record) {
    if (this.records.length > 8) {
      this.records.pop();
      this.records.unshift(n)
    } else {
      this.records.unshift(n)
    }
    localStorage.setItem('searchRecords', JSON.stringify(this.records));
  }

  getRecords() {
    this.records = <record[]>JSON.parse(localStorage.getItem('searchRecords'));
  }

}
