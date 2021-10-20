class Traveler {
    constructor(name) {
        this._name = name
        this._food = 1
        this._isHealthy = true
    }

    get name() {
        return this._name
    }

    get food() {
        return this._food
    }

    get isHealthy() {
        return this._isHealthy
    }

    set name(name) {
        this._name = name
    }

    set food(food) {
        this._food = food
    }

    set isHealthy(isHealthy) {
        this._isHealthy = isHealthy
    }

    hunt() {
        return this.food += 2
    }

    eat() {

        if (this.food === 0) {
            return this.isHealthy = false

        } else if (this.food > 0) {
            return this.food--
        }
    }

}

class Hunter extends Traveler {
    constructor(name) {
        super(name)
        this._food = 2
    }

    hunt() {
        return this.food += 5
    }

    eat() {
        if (this.food >= 2) {
            this.food -= 2
        } else if (this.food < 2) {
            this.food -= 1
            this.isHealthy = false
        }
    }

    giveFood(traveler, numOfFoodUnits) {
        if (this.food >= numOfFoodUnits) {
            traveler.food += numOfFoodUnits
            this.food -= numOfFoodUnits
        }
    }
}

class Doctor extends Traveler {
    constructor(name) {
        super(name)
    }
    heal(traveler) {
        if (traveler.isHealthy === false) {
            traveler.isHealthy = true
        }
    }
}

class Wagon {
    constructor(capacity) {
        this.capacity = capacity
        this.passageiros = []
    }

    getAvailableSeatCount() {
        return this.capacity - this.passageiros.length
    }

    join(nome) {
        if (this.capacity > this.passageiros.length) {
            this.passageiros.push(nome)
        }
    }

    shouldQuarantine() {
        let doente = false
        for (let i = 0; i < this.passageiros.length; i++) {
            if (this.passageiros[i].isHealthy === false) {
                doente = true
            }
        }
        return doente
    }

    totalFood() {
        let totalComida = 0
        for (let i = 0; i < this.passageiros.length; i++) {
            totalComida += this.passageiros[i].food

        }
        return totalComida
    }
}

// Cria uma carroça que comporta 4 pessoas
let wagon = new Wagon(4);
// Cria cinco viajantes
let henrietta = new Traveler('Henrietta'); // 0 true
let juan = new Traveler('Juan'); // 4 true
let drsmith = new Doctor('Dr. Smith'); // 2 true
let sarahunter = new Hunter('Sara'); // 0 false
let maude = new Traveler('Maude');

console.log(`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

wagon.join(henrietta);
console.log(`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

wagon.join(juan);
wagon.join(drsmith);
wagon.join(sarahunter);

wagon.join(maude); // Não tem espaço para ela!
console.log(`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);

sarahunter.hunt(); // pega mais 5 comidas
drsmith.hunt();

console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);

henrietta.eat();
sarahunter.eat();
drsmith.eat();
juan.eat();
juan.eat(); // juan agora está doente (sick)

console.log(`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);

drsmith.heal(juan);
console.log(`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`);

sarahunter.giveFood(juan, 4);
sarahunter.eat(); // Ela só tem um, então ela come e fica doente

console.log(`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);