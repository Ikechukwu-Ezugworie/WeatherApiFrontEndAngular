import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  @Input() display: boolean;
  @Input() message: string;
  @Output() clicking = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  emitEvent() {
    this.clicking.emit('Hello world');
  }

}
