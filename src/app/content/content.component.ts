import { Component, OnInit, ElementRef, ViewContainerRef } from '@angular/core';
import { UserprofileComponent } from '../userprofile/userprofile.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent2 implements OnInit {
  constructor(private viewContainerRef: ViewContainerRef) { }
  message: string ="EEEEEEQUADOR";
  ngOnInit() {
  }

  exit (){
    this.getParentComponent().turnOffView();
  }

  getParentComponent(): UserprofileComponent {
    return this.viewContainerRef[ '_data' ].componentView.component.viewContainerRef[ '_view' ].component
  }
}
