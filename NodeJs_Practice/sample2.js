// Another way to export a local module ( if only one function/variable/object/class has to be export ) 

module.exports.info = {
    name: 'Sonu Chaudhary',
    age: 25,
    hobbies: [
        'listening music', 'playing badminton'
    ]
};

// module.exports = info;
// default exported module can be imported by any name