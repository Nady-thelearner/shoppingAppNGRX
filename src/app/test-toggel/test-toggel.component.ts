import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-toggel',
  templateUrl: './test-toggel.component.html',
  styleUrls: ['./test-toggel.component.css']
})
export class TestToggelComponent implements OnInit {
  value =10;
  oddNumbers = [1,3,5];
  evenNumbers  = [2,4,6];
  onlyOdd = true;

  constructor() { }

  ngOnInit(): void {
  }

}
