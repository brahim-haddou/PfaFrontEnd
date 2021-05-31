import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-imgslide',
  templateUrl: './imgslide.component.html',
  styleUrls: ['./imgslide.component.css']
})
export class ImgslideComponent implements OnInit {

  imageObject: Array<object> = [{
    image: 'https://plchldr.co/i/500x250',
    thumbImage: 'https://plchldr.co/i/500x250',
    alt: 'https://plchldr.co/i/500x250?bg=111111',
    order: '1'
}, {
    image: 'https://plchldr.co/i/500x250', // Support base64 image
    thumbImage: 'https://plchldr.co/i/500x250', // Support base64 image
     //Optional: You can use this key if want to show image with title
    alt: 'https://plchldr.co/i/500x250?bg=111111', //Optional: You can use this key if want to show image with alt
    order: 2 //Optional: if you pass this key then slider images will be arrange according @input: slideOrderType
}
];

  constructor() { }

  ngOnInit(): void {
  }

}
