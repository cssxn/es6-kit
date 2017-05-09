
import Person from './services/person';

class App {

    constructor(){
        new Person().getName(12);
    }
}

new App();
