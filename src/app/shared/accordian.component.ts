import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-accordian',
  templateUrl: './accordian.component.html',
  styleUrls: ['./accordian.component.css']
})
export class AccordianComponent implements OnInit {
  @Input() hasJustViewed: boolean;
  @Input() title: string;
  isHidden = true;
  constructor() { }

  ngOnInit() {
  }

}
