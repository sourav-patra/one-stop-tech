import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, Subject, Subscriber } from "rxjs";
import { debounce, debounceTime, delay, filter, map, pluck, takeUntil } from "rxjs/operators";
import { HttpService } from "src/app/core/services/http/http.service";
import { snakeToCamelCase } from "src/app/core/utils/string-utils";
import {
  PRODUCT_CATEGORIES_CONST,
  PRODUCT_CATEGORIES_ENUM,
} from "src/app/shared/constants/products.constants";
import { ProductModel } from "src/app/shared/models/product.model";
import { IResponseModel } from "src/app/shared/models/response.model";

@Injectable()
export class HomeService implements OnDestroy {
  private productList$ = new BehaviorSubject<ProductModel[]>([]);
  get productListObs(): Observable<ProductModel[]> {
    return this.productList$.asObservable();
  }
  private destroy$ = new Subject<boolean>();
  private loading$ = new BehaviorSubject<boolean>(true);
  get loadingObs(): Observable<boolean> {
    return this.loading$.asObservable();
  }
  constructor(private httpService: HttpService) {}

  /**
   * Destroy data streams
   */
  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  /**
   * Set the product list
   * @param productList response
   */
  public setProductList(productList: ProductModel[]): void {
    this.productList$.next(productList);
  }

  /**
   * Show loading spinner
   */
  public showLoading(): void {
    this.loading$.next(true);
  }

  /**
   * Hide loading spinner
   */
  public hideLoading(): void {
    this.loading$.next(false);
  }

  /**
   * Filter search results
   * @param productList response
   * @param searchString query string
   * @param category category selected
   */
  public filterResults(
    productList: ProductModel[],
    searchString: string,
    category?: PRODUCT_CATEGORIES_ENUM
  ): ProductModel[] {
    if (searchString?.length) {
      if (category === PRODUCT_CATEGORIES_ENUM.allDevices) {
        return productList.filter(
          (product: ProductModel): boolean =>
            product.productName.toLowerCase().indexOf(searchString.trim().toLowerCase()) !== -1
        );
      } else {
        return productList.filter(
          (product: ProductModel): boolean =>
            product.category === category &&
            product.productName.toLowerCase().indexOf(searchString.trim().toLowerCase()) !== -1
        );
      }
    } else {
      if (category === PRODUCT_CATEGORIES_ENUM.allDevices) {
        return productList;
      } else {
        return productList.filter(
          (product: ProductModel): boolean => product.category === category
        );
      }
    }
  }

  /**
   * Local search using input box
   * @param searchString search string
   */
  public localSearch(searchString: string, category: PRODUCT_CATEGORIES_ENUM): void {
    this.httpService
      .fetchData(`/products.json`)
      .pipe(
        debounceTime(200),
        map((response: IResponseModel<ProductModel[]>): any => snakeToCamelCase(response)),
        pluck("data"),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (productList: ProductModel[]): void => {
          try {
            this.setProductList(this.filterResults(productList, searchString, category));
          } catch (error) {
            this.setProductList([]);
          }
        },
        error: (): void => {
          this.setProductList([]);
        },
      });
  }

  /**
   * Get product list
   */
  public getProductList(category?: PRODUCT_CATEGORIES_ENUM): void {
    this.showLoading();
    // If data exists already then before the next fetch,
    if (this.productList$.getValue?.length) {
      this.setProductList([]);
    }
    this.httpService
      .fetchData(`/products.json`)
      .pipe(
        delay(200), // simulate server-client latency
        map((response: IResponseModel<ProductModel[]>): any => snakeToCamelCase(response)),
        pluck("data"),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (productList: ProductModel[]): void => {
          this.hideLoading();
          if (category === PRODUCT_CATEGORIES_ENUM.allDevices) {
            this.setProductList(productList);
          } else {
            this.setProductList(
              productList.filter((product: ProductModel): boolean => product.category === category)
            );
          }
        },
        error: (): void => {
          this.setProductList([]);
          this.hideLoading();
        },
      });
  }
}
