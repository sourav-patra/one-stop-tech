import { Component, Input } from "@angular/core";
import { ProductModel } from "src/app/shared/models/product.model";

@Component({
  selector: "app-product-item",
  templateUrl: "./product-item.component.html",
  styleUrls: ["./product-item.component.scss"],
})
export class ProductItemComponent {
  public imageLoading = true;
  @Input() product: ProductModel;
  constructor() {}

  /**
   * Hide the image loader when it is rendered in the DOM
   */
  public onImageLoad(): void {
    this.imageLoading = false;
  }
}
