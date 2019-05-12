import { Component, OnInit } from '@angular/core';
import { SearchData, CaseResultData, UserResultData, ResourceResultData } from '../search2/http-service/SearchData';
import { HttpServiceService } from './http-service/http-service.service';
import { SearchComponent } from '../search/search.component';



@Component({
  selector: 'app-search2',
  templateUrl: './search2.component.html',
  styleUrls: ['./search2.component.css'],
  providers: [{ provide: parent, useExisting: SearchComponent }]
})
export class Search2Component implements OnInit {

  constructor(private http: HttpServiceService) { }

  ngOnInit() {
  }


  //下拉框的选择数据
  optionList = [
    { label: '服务器', value: '服务器' },
    { label: 'IP/域名', value: 'IP/域名' },
    { label: '人员', value: '人员' },
    { label: '业务系统', value: '业务系统' },
    { label: '存储', value: '存储' },
    { label: '事件', value: '事件' },
  ];
  selectedValue = { label: '服务器', value: '服务器' };

  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.value === o2.value : o1 === o2);

  //获取用户输入的数据
  searchData: SearchData = new SearchData('', '');
  caseResultData: CaseResultData[] = [];
  userResultData: UserResultData[] = [];
  resourceResultData: ResourceResultData[] = [];
  search() {
    this.loading = true;
    this.isResult = true;
    this.searchData.ResourceClass = this.selectedValue.value;
    if (this.selectedValue.value == '事件') {
      this.http.searchCase(this.searchData).subscribe((data: CaseResultData[]) => {
        this.caseResultData = data;
      })
      setTimeout(() => {//换数据
        this.data = this.caseResultData;
        this.loading = false;
      }, 500)
    } else {
      if (this.selectedValue.value == '人员') {
        this.http.searchPeople(this.searchData).subscribe((data: UserResultData[]) => {
          this.userResultData = data;
        })
        setTimeout(() => {//换数据
          this.data = this.userResultData;
          this.loading = false;
        }, 500)
      } else {
          this.http.searchResource(this.searchData).subscribe((data: ResourceResultData[]) => {
            this.resourceResultData = data;
          })
          setTimeout(() => {//换数据
            this.data = this.resourceResultData;
            this.loading = false;
          }, 500)
      }
    }
  }

   a() {
     this.isResult = true;
     this.data = this.http.get()
   }


  //搜索的结果数据
  loading = false;  //是否进行加载动画
  data = []
    

  isResult: boolean = true;
  /*contentData: CaseResultData = new CaseResultData(null, '1', '2', ['3'], '4', '5', '6', '7', '8', '9');
  get(item: CaseResultData) {
    //进入content界面
    this.contentData = item
    this.isResult = false;
  }*/
  contentData: any 
  get(item: any) {
    //进入content界面
    this.contentData = item
    this.isResult = false;
  }

  onBack() {
    this.isResult = true;
  }
}
