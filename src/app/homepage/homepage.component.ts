import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  title = 'PfaFrontEnd';

  // tslint:disable-next-line:variable-name
  constructor(public _vps: ViewportScroller) { }

  ngOnInit(): void {
  }

  scrollFn(anchor: string): void{
      this._vps.scrollToAnchor(anchor);
      console.log('scroled');
  }

}
