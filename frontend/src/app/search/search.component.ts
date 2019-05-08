import { Component, OnInit } from '@angular/core';
import { trigger,state,style,animate,transition, } from '@angular/animations';

@Component({
  selector: 'app-search',
 animations:[    
  trigger('selected',[
  state('close',style({

  })),
  state('open',style({
    backgroundColor: 'white'
  })),
  transition('close=>open',[animate(0.0001)] ),
  transition('open=>close',[animate(0.0001)] ),
  ])
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {  
    
  }

  //控制被选中标签动画；
  isServer:boolean = true;
  isIp:boolean = false;
  isPersion:boolean = false;
  isBusinessSystem:boolean = false;
  isStorageEquipment:boolean = false;
  isEvent:boolean = false;
  ClickTagServer(){
    this.isServer = true;
    this.isIp = false;
    this.isPersion = false;
    this.isBusinessSystem = false;
    this.isStorageEquipment = false;
    this.isEvent = false;
  }
  ClickTagIP(){
    this.isServer = false;
    this.isIp = true;
    this.isPersion = false;
    this.isBusinessSystem = false;
    this.isStorageEquipment = false;
    this.isEvent = false;
  }
  ClickTagPersion(){
    this.isServer = false;
    this.isIp = false;
    this.isPersion = true;
    this.isBusinessSystem = false;
    this.isStorageEquipment = false;
    this.isEvent = false;
  }
  ClickTagBS(){
    this.isServer = false;
    this.isIp = false;
    this.isPersion = false;
    this.isBusinessSystem = true;
    this.isStorageEquipment = false;
    this.isEvent = false;
  }
  ClickTagSE(){
    this.isServer = false;
    this.isIp = false;
    this.isPersion = false;
    this.isBusinessSystem = false;
    this.isStorageEquipment = true;
    this.isEvent = false;
  } 
  ClickTagEvent(){
    this.isServer = false;
    this.isIp = false;
    this.isPersion = false;
    this.isBusinessSystem = false;
    this.isStorageEquipment = false;
    this.isEvent = true;
  }

  items:string[] = ["哦迪萨发活动i啊神佛嗲还是哦i的合法哦四分好啊哈佛i阿红i黑暗时代","fasfdafdasfdasfowiehtewjihrtwjabruiwqrhgewqbreuwqirgeiugfasdiugfis","fdasfds","|","as","asdf","iuqwre","1"]  //测试数据

  Detail:string
  ClickItem(item:string){
    this.Detail = item;
  }
}
