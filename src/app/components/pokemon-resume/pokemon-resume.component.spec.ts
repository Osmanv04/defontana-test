import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonResumeComponent } from './pokemon-resume.component';

describe('PokemonResumeComponent', () => {
  let component: PokemonResumeComponent;
  let fixture: ComponentFixture<PokemonResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonResumeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
