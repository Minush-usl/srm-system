import { Injectable } from "@angular/core";
import { OrderPosition } from "../shared/interfaces/interfaces";
import { Position } from "../shared/interfaces/interfaces";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  public list: OrderPosition[] = [];
  public price: number = 0;
  constructor() {}

  add(position: Position) {
    const orderPosition: OrderPosition = Object.assign(
      {},
      {
        name: position.name,
        cost: position.cost,
        quantity: position.quantity,
        _id: position._id,
      }
    );

    const candidate = this.list.find((p) => p._id === orderPosition._id);

    if (candidate) {
      // IF position is already added to the order, just increase the quantity
      candidate.quantity += orderPosition.quantity
    } else {
      this.list.push(orderPosition);
    }

    this.calculatePrice()
  }

  remove(orderPosition: OrderPosition) {
    const idx = this.list.findIndex(p => p._id === orderPosition._id)
    this.list.splice(idx, 1)
    this.calculatePrice()
  }

  clear() {}

  private calculatePrice() {
    this.price = this.list.reduce((total, item) => {
      return total += item.quantity * item.cost
    }, 0)
  }
}
