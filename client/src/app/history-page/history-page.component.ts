import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import { OrdersService } from '../shared/services/orders.service';
import { Order, Filter } from '../shared/interfaces/interfaces';
import { Subscription } from 'rxjs';

const STEP = 2

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('tooltip') tooltipRef: ElementRef
  tooltip: MaterialInstance
  orders: Order[] = []

  offset = 0
  limit = STEP
  oSub: Subscription

  reloading: boolean = false
  noMoreOrders: boolean = false
  filter: Filter = {}

  isFilterVisible = false
  constructor(
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    this.reloading = true
    this.fetch()
  }

  private fetch() {
    const params = Object.assign({}, this.filter, {
      offset: this.offset,
      limit: this.limit
    })
    this.oSub = this.ordersService.fetch(params).subscribe(orders => {
      this.orders = this.orders.concat(orders)
      this.noMoreOrders = orders.length < 2
      console.log(orders)
      this.reloading = false
    })
  }

  showMore() {
    this.offset += STEP
    this.fetch()
  }

  applyFilter(filter: Filter) {
    this.offset = 0
    this.filter = filter
    this.reloading = true
    this.orders = []
    this.fetch()
  }

  ngAfterViewInit() {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef)
  }

  ngOnDestroy() {
    this.tooltip.destroy()
    this.oSub.unsubscribe()
  }

}
