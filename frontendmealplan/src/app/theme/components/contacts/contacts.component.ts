import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  @Input() dividers:boolean = true;
  @Input() iconSize:string = 'sm';
  @Input() iconColor:string = '';
  constructor() { }

  ngOnInit() {
  }

}
