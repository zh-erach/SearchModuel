import { Component, OnInit } from '@angular/core';
import { SearchData, ResultData } from '../search2/http-service/SearchData';
import { HttpServiceService } from './http-service/http-service.service';


@Component({
  selector: 'app-search2',
  templateUrl: './search2.component.html',
  styleUrls: ['./search2.component.css']
})
export class Search2Component implements OnInit {

  constructor(private http:HttpServiceService) { }

  ngOnInit() {
  }


  //下拉框的选择数据
    optionList = [
      { label: '服务器',value:'服务器'},
      { label: 'IP/域名',value:'IP/域名'},
      { label: '人员',value:'人员'},
      { label: '业务系统',value:'业务系统'},
      { label: '存储',value:'存储'},
      { label: '事件',value:'事件'},
    ];
    selectedValue = {label: '服务器',value:'服务器'};
  /*optionList = [{ label: 'Lucy', value: 'lucy', age: 20 }, { label: 'Jack', value: 'jack', age: 22 }];
  selectedValue = { label: 'Jack', value: 'jack', age: 22 };*/
  // tslint:disable-next-line:no-any
  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.value === o2.value : o1 === o2);
 /* log(value: { label: string; value: string; age: number }): void {
    console.log(value);}*/


  //获取用户输入的数据
  searchData:SearchData = new SearchData('','');
  resultData:ResultData[] ;
  search(){
    this.loading=true;
    this.searchData.ResourceClass=this.selectedValue.value;
    this.http.search(this.searchData).subscribe((data:ResultData[])=>{
      this.resultData = data;
    })
    
    setTimeout(()=>{//换数据
      this.data=[];
      this.loading = false;
    },1000)
  }




  //搜索的结果数据
  loading = false;  //是否进行加载动画
  data = [
    {
      title: '阿道夫',
      tag:'服务器'
    },
    {
      title: '小王',
      tag:'人员'
    },
    {
      title: '主机短路',
      tag:'故障'
    },
    {
      title: 'Ant Design Title 4',
      tag:'a'
    },
    {
      title: 'Ant Design Title 5',
      tag:'a'
    },
    {
      title: 'Ant Design Title 6',
      tag:'a'
    },
    {
      title: 'Ant Design Title 7',
      tag:'a'
    },
  ];
/*
  change(): void {
    this.loading = true;
    if (this.data.length > 0) {
      setTimeout(() => {
        this.data = [];
        this.loading = false;
      }, 1000);
    } else {
      setTimeout(() => {
        this.data = [
          {
            title: 'Ant Design Title 1',
            tag:'a'
          },
          {
            title: 'Ant Design Title 2',
            tag:'a'
          },
          {
            title: 'Ant Design Title 3',
            tag:'a'
          },
          {
            title: 'Ant Design Title 4',
            tag:'a'
          }
        ];
        this.loading = false;
      }, 1000);
    }
  }
*/
  //分页数据
current =1;   //当前页数
Total = 100; //总页数
PerPageCount = [10,20,30,50]; //每页条数

loadData():void {
  //跳页事件执行换数据
  this.loading = true;
  setTimeout(()=>{//换数据
    this.data=[];
    this.loading = false;
  },1000)
}

}
