import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RouterTestingModule } from "@angular/router/testing";
import { InvalidRouteComponent } from "./invalid-route.component";

describe("InvalidRouteComponent", () => {
  let component: InvalidRouteComponent;
  let fixture: ComponentFixture<InvalidRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InvalidRouteComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
