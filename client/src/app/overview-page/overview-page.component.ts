import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { AnalyticsService } from '../shared/services/analytics.service';
import { OverviewPage } from '../shared/interfaces/interfaces';
import { Observable } from 'rxjs';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit, OnDestroy, AfterViewInit {
  data$: Observable<OverviewPage>
  yesterday = new Date()
 
  @ViewChild('tapTarget') tapTargetRef: ElementRef
  tapTarget: MaterialInstance

  constructor(
    private service: AnalyticsService
  ) { }

  ngOnInit(): void {
    this.data$ = this.service.getOverview()
    this.yesterday.setDate(this.yesterday.getDate() - 1)
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
  }

  openTap() {
  }

}
