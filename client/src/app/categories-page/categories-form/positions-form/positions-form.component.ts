import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { PositionsService } from 'src/app/shared/services/positions.service';
import { Position } from 'src/app/shared/interfaces/interfaces';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { MaterialInstance } from '../../../shared/classes/material.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  form: FormGroup
  positionId = null

  constructor(
    private positionsService: PositionsService
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      cost: new FormControl(1, [Validators.required, Validators.min(1)])
    })
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
    this.positionId = position._id
    this.modal.open()
    this.form.patchValue({
      name: position.name,
      cost: position.cost
    })
    MaterialService.updateTextInputs()
  }

  onAddPosition() {
    this.positionId = null
    this.modal.open()
    this.form.patchValue({
      name: null,
      cost: 1
    })
    MaterialService.updateTextInputs()
  }

  onCancel() {
    this.modal.close()
  }

  onDeletePosition(event: Event, position: Position) {
    event.stopPropagation()
    const confirmation = window.confirm(`Are you sure to delete ${position.name} position?`)

    if (confirmation) {
      this.positionsService.delete(position._id).subscribe(
        response => {
          const indx = this.positions.findIndex(p => p._id === position._id)
          this.positions.splice(indx, 1)
          MaterialService.toast(response.message)
        },
        error => MaterialService.toast(error.error.message)
      )
    } else {

    }
  }

  
  onSubmit() {
    this.form.disable()
    
    const newPosition: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId
    }

    const completed = () => {
      this.modal.close()
      this.form.reset({name: '', cost: 1})
      this.form.enable()
    }

    if (this.positionId) {
      newPosition._id = this.positionId
      this.positionsService.update(newPosition).subscribe(
        position => {
          const posIdx = this.positions.findIndex(p => p._id === position._id)
          this.positions[posIdx] = position
          MaterialService.toast('Changes has been saved')
        },
        error => MaterialService.toast(error.error.message),
        completed
      )

    } else {
      this.positionsService.create(newPosition).subscribe(
        position => {
          MaterialService.toast(`${position.name} position is created.`)
          this.positions.push(position)
        },
        error => MaterialService.toast(error.error.message),
        completed
      )
    }

  }
}
