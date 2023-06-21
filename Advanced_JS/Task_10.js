// Call Method

let obj1 = {
    firstName: 'Sonu',
    lastName: 'Chaudhary',
}

let obj2 = {
    firstName: 'Monu',
    lastName: 'Chaudhary',
}

function printFullName(city, state) {
    console.log(`${this.firstName} ${this.lastName} from ${city} state ${state}`);
}

printFullName.call(obj1, 'GZB', 'UP');
printFullName.call(obj2, 'GZB', 'UP');

// Apply Method
printFullName.apply(obj1, ['Gzb', 'UP'])

// Bind Method
let obj3 = {
    firstName: 'Manu',
    lastName: 'Chaudhary',
}

let result = printFullName.bind(obj3, 'GZB', 'UP');
result()


    
    