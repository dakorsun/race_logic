import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss']
})
export class LogoutButtonComponent implements OnInit {

  constructor() { }

  @Input() username: string | undefined;

  ngOnInit(): void {

  }

}
