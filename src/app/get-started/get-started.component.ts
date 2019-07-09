import { Component, OnInit } from '@angular/core';

import { Router} from '@angular/router';

import { ServerCallsService } from '../server-calls.service';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css']
})
export class GetStartedComponent implements OnInit {
  constructor(public router: Router ,public servercall:ServerCallsService) { }

  ngOnInit() {

  }
}
