module.exports = class Queue {
    constructor() {
        this.dataStore = [];
    }

    enqueue(data) {
        this.dataStore.push(data);
    }

    dequeue() {
        return this.dataStore.shift();
    }

    display() {
        for (let i=0; i<this.dataStore.length; i++) {
            console.log(this.dataStore[i]);
        }
    }
}
