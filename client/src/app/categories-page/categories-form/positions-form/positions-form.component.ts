import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { PositionsService } from 'src/app/shared/services/positions.service';
import { Position } from 'src/app/shared/interfaces/interfaces';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { MaterialInstance } from '../../../shared/classes/material.service'

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('categoryId') categoryId: string
  @ViewChild('modal') modalRef: ElementRef
  positions: Position[] = []
  loading: boolean = false
  modal: MaterialInstance

  constructor(
    private positionsService: PositionsService
  ) { }

  ngOnInit(): void {
    this.loading = true
    this.positionsService.fetch(this.categoryId).subscribe(positions => {
      this.positions = positions
      this.loading = false
    })
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  ngOnDestroy() {
    this.modal.destroy()
  }

  onSelectPosition(position: Position) {
    this.modal.open()
  }

  onAddPosition() {
    this.modal.open()
  }

  onCancel() {
    this.modal.close()
  }
}
