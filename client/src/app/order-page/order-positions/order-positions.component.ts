import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { PositionsService } from "src/app/shared/services/positions.service";
import { Observable } from "rxjs";
import { switchMap, map } from "rxjs/operators";
import { OrderService } from '../order.service';
import { MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: "app-order-positions",
  templateUrl: "./order-positions.component.html",
  styleUrls: ["./order-positions.component.scss"],
})
export class OrderPositionsComponent implements OnInit {
  positions$

  constructor(
    private route: ActivatedRoute,
    private positionsService: PositionsService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.positions$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.positionsService.fetch(params["id"]);
      }),
      map((positions) => {
        return positions.map(position => {
          position.quantity = 1
          return position
        })
      })
    )
  }

  addToOrder(position){
    console.log(position)
    this.orderService.add(position)
    MaterialService.toast(`x${position.quantity} has been added`)
  }
}
