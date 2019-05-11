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

  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.value === o2.value : o1 === o2);

  //获取用户输入的数据
  searchData:SearchData = new SearchData('','');
  resultData:any[] = []; 
  search(){
    this.loading=true;
    this.searchData.ResourceClass=this.selectedValue.value;
    this.http.search(this.searchData).subscribe((data:ResultData[])=>{
      this.resultData = data;
    })
    setTimeout(()=>{//换数据
      this.data=this.resultData;
      this.loading = false;
    },30)
  }

 a(){
      this.data=this.http.get()
    }


  //搜索的结果数据
  loading = false;  //是否进行加载动画
  data = [
    {
      Name: '阿道夫',
      Label:'服务器'
    },
    {
      Name: '小王',
      Label:'人员'
    },
    {
      Name: '主机短路',
      Label:'故障'
    },
    {
      Name: 'Ant Design Title 4',
      Label:'a'
    },
    {
      Name: 'Ant Design Title 5',
      Label:'a'
    },
    {
      Name: 'Ant Design Title 6',
      Label:'a'
    },
    {
      Name: 'Ant Design Title 7',
      Label:'a'
    },
  ];

  contentData:ResultData=new ResultData('','')
  get(data:ResultData){
    this.contentData = data;
    alert('yes')
  }
}
