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
    { isEnter: false, data: '454897156' },
    { isEnter: false, data: '454897156' },
    { isEnter: false, data: '454897156' },

  ];

  constructor(private el: ElementRef) { }

  ngOnInit() {
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

  onKey(value: string) {
    if (value != "" && value != null) {
      this.isFocusInput = false;
    } else {
      this.isFocusInput = true;
    }
    this.values = value;
  }

  toSearch() {
    if (this.values != "" && this.values != null) {
      this.getValue.emit(this.values)
      console.log(this.values);
    }
  }


}
