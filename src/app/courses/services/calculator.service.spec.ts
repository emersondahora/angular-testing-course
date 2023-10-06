import { TestBed } from '@angular/core/testing';
import { CalculatorService } from "./calculator.service";
import { LoggerService } from './logger.service';

describe('CalculatorService', () =>{
  let loggerSpy:any,
      calculator:CalculatorService;

  beforeEach(() =>  {
    loggerSpy = jasmine.createSpyObj('LoggerService', [ "log"]);

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {
          provide: LoggerService,
          useValue: loggerSpy
        }
      ]
    });

    calculator = TestBed.inject(CalculatorService);
  });

  it('should add two numbers', () => {
    expect(calculator.add(2,2)).toBe(4, "Teste falhou");
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract two numbers', () => {
    expect(calculator.subtract(2,2)).toBe(0, "Unexpected subtraction result");
  });
})
