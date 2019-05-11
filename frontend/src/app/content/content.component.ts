import { Component, OnInit } from '@angular/core';
import { Search2Component } from '../search2/search2.component';
import { ResultData } from '../search2/http-service/SearchData'
import { DataTranslateService } from '../dataTranlate';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  constructor(private c:DataTranslateService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.message=this.c.data
  }
  message:ResultData =new ResultData('','')
}
