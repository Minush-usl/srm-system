import { Component, OnInit, Output, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Filter } from 'src/app/shared/interfaces/interfaces';
import { EventEmitter } from '@angular/core';
import { MaterialDatepicker, MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements AfterViewInit, OnDestroy {
  
  @Output() onFilter = new EventEmitter<Filter>()

  @ViewChild('start') startRef: ElementRef
  @ViewChild('end') endRef: ElementRef

  order: number

  start: MaterialDatepicker
  end: MaterialDatepicker
  isValid: boolean = true


  ngAfterViewInit() {
    this.start = MaterialService.initDatepicker(this.startRef, this.validate.bind(this))
    this.end = MaterialService.initDatepicker(this.endRef, this.validate.bind(this))
  }

  ngOnDestroy() {
    this.start.destroy()
    this.end.destroy()
  }  

  validate() {
    if (!this.start.date || !this.end.date ) {
      this.isValid = true
      return
    }
    this.isValid = this.start.date < this.end.date
  }

  submitFilter() {
    const filter: Filter = {}

    if (this.order) {
      filter.order = this.order
    }

    if (this.start.date) {
      filter.start = this.start.date
    }

    if (this.end.date) {
      filter.end = this.end.date
    }

    console.log(filter)
    this.onFilter.emit(filter)
  }
  

}
