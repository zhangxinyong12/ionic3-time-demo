import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { EditorPage } from './editor/editor';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  time_list: Array<any> = []; // 日期详情数据
  week_list = ['日', '一', '二', '三', '四', '五', '六'];
  now_day;//当天
  constructor(public navCtrl: NavController) {

  }
  ngOnInit() {
    // 数据格式
    // 详情数据应该是后台传过来的。 一下逻辑是为了制造假数据
    const now = new Date();
    const now_week = now.getDay();
    const now_day = now.getDate();
    this.now_day = now_day;
    console.log(now_week, now_day);
    for (let i = 1; i < 31; i++) {
      if (now_day === i) { // 当天
        const data = {
          now: '0', // 0 当前 ，-1 过去，1 之后 
          day: i
        };
        this.time_list.push(data);
      } else if (now_day > i) { // 之前 
        const mood = Math.random() > 0.5 ? '高兴' : '不高兴';
        const data = {
          now: '-1',
          mood,
          day: i
        };
        this.time_list.push(data);
      } else { // 之后
        const data = {
          now: '1',
          day: i
        };
        this.time_list.push(data);
      };
    }

    // 通过判断当前日期是周几，往 time_list前插入 多个空白,线上取服务器时间
    if (now_week > 0) {
      console.log('00000000');
      for (let i = 0; i < now_week - 1; i++) {
        this.time_list.unshift({});
      };
    };
    console.log(this.time_list);
  }
  gotoPage(day) {
    if (day === this.now_day) {
      this.navCtrl.push(EditorPage);
    }
  }
}
