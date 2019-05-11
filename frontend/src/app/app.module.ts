import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { SearchComponent } from './search/search.component';
import { SearchBoxComponent } from './search-box/search-box.component';
//http模块
import { HttpClientModule } from '@angular/common/http';
import { Search2Component } from './search2/search2.component';

// 在终端中（本app文件下）输入命令ng add ng-zorro-antd,进行配置
//引入Ant Designer-UI,安装组件在终端中（本app文件下）输入命令npm install ng-zorro-antd --save
//选择zh-CN
//在angular.json文件中的
/** 配置 angular i18n **/
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh)

import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';

import { NzSelectModule } from 'ng-zorro-antd';
import { NzInputModule } from 'ng-zorro-antd';
import { NzButtonModule } from 'ng-zorro-antd';
import { NzIconModule } from 'ng-zorro-antd';
import { NzListModule } from 'ng-zorro-antd';
import { NzPaginationModule } from 'ng-zorro-antd';
import { HttpServiceService } from './search2/http-service/http-service.service';
import { ContentComponent } from './content/content.component';

@NgModule({
  declarations: [
    AppComponent,
    
    SearchComponent,
    SearchBoxComponent,
    Search2Component,
    ContentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    BrowserAnimationsModule,
    FormsModule,

    HttpClientModule,
//导入 ng-zorro-antd 模块
  //  NgZorroAntdModule,

    NzSelectModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzListModule,
    NzPaginationModule,
  ],
  providers: [{provide: NZ_I18N, useValue: zh_CN},HttpServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
