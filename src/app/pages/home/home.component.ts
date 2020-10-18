import { Component, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { debounceTime, takeUntil } from "rxjs/operators";
import * as CONST from "src/app/shared/constants/products.constants";
import { HomeService } from "./services/home.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
  public productList$ = this.homeService.productListObs;
  public loader$ = this.homeService.loadingObs;
  public categoriesList = CONST.PRODUCT_CATEGORIES_CONST;
  public activeCategory: CONST.PRODUCT_CATEGORIES_ENUM;
  public searchForm = new FormGroup({
    search: new FormControl(null),
  });
  get f(): { [key: string]: AbstractControl } {
    return this.searchForm.controls;
  }
  public destroy$ = new Subject<boolean>();
  constructor(private homeService: HomeService) {}

  /**
   * Initial load
   */
  public ngOnInit(): void {
    this.selectCategory();
    this.searchForm.valueChanges.pipe(debounceTime(200), takeUntil(this.destroy$)).subscribe({
      next: (formValue: { search: string }): void => {
        console.log(formValue);
        this.homeService.localSearch(formValue.search, this.activeCategory);
      },
    });
  }

  /**
   * Destroy data streams
   */
  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  /**
   * Clear Search
   */
  public clearSearch(): void {
    this.searchForm.reset();
  }

  /**
   * Show products for the above category
   * @param category Category selected
   */
  public selectCategory(
    category: CONST.PRODUCT_CATEGORIES_ENUM = CONST.PRODUCT_CATEGORIES_ENUM.allDevices
  ): void {
    this.activeCategory = category;
    this.homeService.getProductList(category);
  }
}
