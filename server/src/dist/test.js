var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import 'reflect-metadata';
import { Container, Service } from 'typedi';
console.log('hey');
let Se = class Se {
    constructor() {
        console.log("new");
    }
    hey() { console.log('hey'); }
};
Se = __decorate([
    Service()
], Se);
export default Se;
Container.get(Se).hey();
/*
export class BeanFactory {
  create() {
    console.log("Brewing beans");
  }
}

class SugarFactory {
  create() {
    console.log("Sugar is being added.");
  }
}

class WaterFactory {
  create() {
    console.log("Water added.");
  }
}

class CoffeeMaker {
  constructor(container) {
    this.beanFactory = container.get(BeanFactory);
    this.sugarFactory = container.get(SugarFactory);
    this.waterFactory = container.get(WaterFactory);
  }

  make() {
    this.beanFactory.create();
    this.sugarFactory.create();
    this.waterFactory.create();
  }
}

// Register every class that will be in the container, note that the order does not matter unless you eager load.
// also note that we are not instantiating the class here, it will be instantiated whenever you call .get() for the first (and as such the constructor will run).


export const container = ()=>{

  Container.set({type: CoffeeMaker, id: CoffeeMaker});
  Container.set({type: BeanFactory, id: 'BeanFactory'});
  Container.set({type: SugarFactory, id: SugarFactory});
  Container.set({type: WaterFactory, id: WaterFactory});

}
*/ 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsT0FBTyxrQkFBa0IsQ0FBQTtBQUN6QixPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUU1QyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBR0gsSUFBTSxFQUFFLEdBQVIsTUFBTSxFQUFFO0lBRW5CO1FBRUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNwQixDQUFDO0lBRUQsR0FBRyxLQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUEsQ0FBQyxDQUFDO0NBQzlCLENBQUE7QUFSb0IsRUFBRTtJQUR0QixPQUFPLEVBQUU7R0FDVyxFQUFFLENBUXRCO2VBUm9CLEVBQUU7QUFXdkIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtBQUV2Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBNkNFIn0=