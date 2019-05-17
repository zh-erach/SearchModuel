import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { SearchData, CaseResultData, UserResultData, ResourceResultData, SearchResultData } from './class/SearchData';
import { trigger, state, style, animate, transition, } from '@angular/animations';


const options = [
  {
    value: '实体服务器',
    label: '实体服务器',
    children: [
      {
        value: '大学城服务器',
        label: '大学城服务器',
        children: [
          {
            value: 'a型服务器',
            label: 'a服务器',
            isLeaf: true
          }
        ]
      },
      {
        vlaue: '桂花岗服务器',
        label: '桂花岗服务器',
        isLeaf: true
      }
    ]
  },
  {
    value: '云服务器',
    label: '云服务器',
    children: [
      {
        value: 'web服务器',
        label: 'web服务器',
        children: [
          {
            value: '转接服务器',
            label: ' 转接服务器',
            isLeaf: true
          }
        ]
      }
    ]
  }
];


@Component({
  selector: 'app-search',
  animations: [
    trigger('selected', [
      state('close', style({

      })),
      state('open', style({
        backgroundColor: 'white',
        borderBottom: '3px solid blue'
      })),
      transition('close=>open', [animate(0.0001)]),
      transition('open=>close', [animate(0.0001)]),
    ])
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private http: HttpServiceService) { }

  ngOnInit() {
    //this.http.isAdmin()
    //根据用户类型决定选项
    /* if (this.isAdmin) {
       this.optionList = this.SoptionList
     } else {
       this.optionList = this.NoptionList
     }*/
  }

  //模拟后端判断是否为管理员，是为true
  isAdmin: boolean = true;

  






  //标签交互
  isServer: boolean = true;
  isIp: boolean = false;
  isPersion: boolean = false;
  isBusinessSystem: boolean = false;
  isStorageEquipment: boolean = false;
  isEvent: boolean = false;
  ClickTagServer() {
    this.isServer = true;
    this.isIp = false;
    this.isPersion = false;
    this.isBusinessSystem = false;
    this.isStorageEquipment = false;
    this.isEvent = false;
  }
  ClickTagIP() {
    this.isServer = false;
    this.isIp = true;
    this.isPersion = false;
    this.isBusinessSystem = false;
    this.isStorageEquipment = false;
    this.isEvent = false;
  }
  ClickTagPersion() {
    this.isServer = false;
    this.isIp = false;
    this.isPersion = true;
    this.isBusinessSystem = false;
    this.isStorageEquipment = false;
    this.isEvent = false;
  }
  ClickTagBS() {
    this.isServer = false;
    this.isIp = false;
    this.isPersion = false;
    this.isBusinessSystem = true;
    this.isStorageEquipment = false;
    this.isEvent = false;
  }
  ClickTagSE() {
    this.isServer = false;
    this.isIp = false;
    this.isPersion = false;
    this.isBusinessSystem = false;
    this.isStorageEquipment = true;
    this.isEvent = false;
  }
  ClickTagEvent() {
    this.isServer = false;
    this.isIp = false;
    this.isPersion = false;
    this.isBusinessSystem = false;
    this.isStorageEquipment = false;
    this.isEvent = true;
  }




  // 
  nzOptions = options;
  //事件下拉框选项逻辑 
   optionList=[
    {label:'故障',value:'故障'},
    {label:'巡检',value:'巡检'},
    {label:'部署',value:'部署'},
    {label:'维护',value:'维护'},
    {label:'更新',value:'更新'},
    {label:'升级',value:'升级'},
    {label:'其他',value:'其他'},
  ]
  selectedValue = { label: '故障', value: '故障' };
  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.value === o2.value : o1 === o2);

  //资源分类的级联选择结果
  ResourcesClass: string = null//传回后端的分类值(SResourceClass)
  values: any[] | null = null;
  onChanges(values: any): void {
    console.log(values, this.values);
    this.ResourcesClass = this.values[this.values.length - 1]
  }





//搜索功能
  searchTag:string='资源'   //搜索的类型（事件、资源、人员）
  searchData: SearchData = new SearchData('', '', '') //传回后端进行查询的值
  caseResultData: CaseResultData[] = [];
  userResultData: UserResultData[] = [];
  resourceResultData: ResourceResultData[] = [];
  searchResultData:SearchResultData;    //搜索的结果
  search() {
    if (this.isServer || this.isIp || this.isBusinessSystem || this.isStorageEquipment) {
      this.searchData.BResourceClass = '资源'
    } else {
      if (this.isEvent) {
        this.searchData.BResourceClass = '事件'
      } else {
        this.searchData.BResourceClass = '人员'
      }
    }

    if (this.searchData.BResourceClass == '事件') {
      this.searchData.SResourceClass =  this.selectedValue.value
      this.http.searchCase(this.searchData).subscribe((data: any) => {
        this.searchTag='事件'
        this.searchResultData = <SearchResultData>data.objects;
        this.caseResultData = this.searchResultData.caseResult;
        this.userResultData = this.searchResultData.userResult;
        this.resourceResultData = this.searchResultData.resourceResult;
      })/*
        this.caseResultData=this.http.searchCase(this.searchData).caseResult
        this.userResultData = this.http.searchCase(this.searchData).userResult
        this.resourceResultData =this.http.searchCase(this.searchData).resourceResult
        this.contentData=this.http.searchResource(this.searchData).resourceResult*/
    } else {
      if (this.searchData.BResourceClass == '人员') {
       this.http.searchPeople(this.searchData).subscribe((data: any) => {
         this.searchTag='人员'
        this.searchResultData = <SearchResultData>data.objects;
        this.caseResultData = this.searchResultData.caseResult;
        this.userResultData = this.searchResultData.userResult;
        this.resourceResultData = this.searchResultData.resourceResult;
        
        }) /*
        this.caseResultData=this.http.searchPeople(this.searchData).caseResult
        this.userResultData = this.http.searchPeople(this.searchData).userResult
        this.resourceResultData =this.http.searchPeople(this.searchData).resourceResult*/
      } else {
        this.searchData.SResourceClass = this.ResourcesClass
       
        this.http.searchResource(this.searchData).subscribe((data: any) => {
          this.searchTag='资源'
          this.searchResultData = <SearchResultData>data.objects;
          this.caseResultData = this.searchResultData.caseResult;
          this.userResultData = this.searchResultData.userResult;
          this.resourceResultData = this.searchResultData.resourceResult;
          
       }) /*this.caseResultData=this.http.searchResource(this.searchData).caseResult
        this.userResultData = this.http.searchResource(this.searchData).userResult
        this.resourceResultData =this.http.searchResource(this.searchData).resourceResult*/
      }
    }
  }

  //搜索结果
  configureDetail:string           //详细配置
  isVisible = false;

  showModal(data): void {
    this.isVisible = true;
    this.configureDetail=data.CaseDetail
  }
  handleOK(): void {
    this.isVisible = false;
  }
  handleCancel(): void {
    this.isVisible = false;
  }

  //“查看此项”
  CaseLookOneLine(data){
    this.searchData.BResourceClass = '事件';
    this.searchData.KeyWord = data.RName;
    this.http.searchCase(this.searchData).subscribe((data: any) => {
      this.searchTag='事件';
      this.searchResultData = <SearchResultData>data.objects;
      this.caseResultData = this.searchResultData.caseResult;
      this.userResultData = this.searchResultData.userResult;
      this.resourceResultData = this.searchResultData.resourceResult;
    })
  }
  ResourceLookOneLine(data){
      this.searchData.BResourceClass = '资源';
      this.searchData.KeyWord = data.Name;
      this.http.searchCase(this.searchData).subscribe((data: any) => {
        this.searchTag='资源';
        this.searchResultData = <SearchResultData>data.objects;
        this.caseResultData = this.searchResultData.caseResult;
        this.userResultData = this.searchResultData.userResult;
        this.resourceResultData = this.searchResultData.resourceResult;
      })
  }
  PeopleLookOneLine(data){
    this.searchData.BResourceClass = '人员';
    this.searchData.KeyWord = data.Name;
    this.http.searchCase(this.searchData).subscribe((data: any) => {
      this.searchTag='人员';
      this.searchResultData = <SearchResultData>data.objects;
      this.caseResultData = this.searchResultData.caseResult;
      this.userResultData = this.searchResultData.userResult;
      this.resourceResultData = this.searchResultData.resourceResult;
    })
}




  resourcetestData = [{
    Name:'adsfdasfads',
    RUser:'daffasd',
    RAdmin:'oiuoop',
    RLocation:'asdffds',
    RUse:'dafsa'
  },{
    Name:'adsfdasfads',
    RUser:'daffasd',
    RAdmin:'oiuoop',
    RLocation:'asdffds',
    RUse:'dafsa'
  },{
    Name:'adsfdasfads',
    RUser:'daffasd',
    RAdmin:'oiuoop',
    RLocation:'asdffds',
    RUse:'dafsa'
  },{
    Name:'adsfdasfads',
    RUser:'daffasd',
    RAdmin:'oiuoop',
    RLocation:'asdffds',
    RUse:'dafsa'
  },{
    Name:'adsfdasfads',
    RUser:'daffasd',
    RAdmin:'oiuoop',
    RLocation:'asdffds',
    RUes:'dafsa'
  },{
    Name:'adsfdasfads',
    RUser:'daffasd',
    RAdmin:'oiuoop',
    RLocation:'asdffds',
    RUse:'dafsa'
  },]

  casetestData = [{
     OperateName: 'string', //例如故障
     Operatetime: 'string', //事件操作时间
     Operator: 'string', //操作者
     OperatePosition: 'string', //操作地点
     CaseDetail: 'string', //操作详情
     RName: "string", //操作资源对象
  }]

}
