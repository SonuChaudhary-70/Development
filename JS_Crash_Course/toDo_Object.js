// Array of objects
const toDO = [
    {
        id: 1,
        task: 'Complete js crash course ASAP',
        status: 'ongoing'
    },
    {
        id: 2,
        task: 'Complete Advances JS Playlist ASAP',
        status: 'ongoing'
    },
    {
        id: 3,
        task: 'Complete sharpener assignment ASAP',
        status: 'ongoing'
    },
    {
        id: 4,
        task: 'Revise previous concept',
        status: 'ongoing'
    }
]

console.log(toDO);

// Convert string Data or object Data in JSON format
const JSON_ToDo = JSON.stringify(toDO)
console.log('\nJson Format ;',JSON_ToDo);

for(let i = 0; i < toDO.length; i++){
    console.log('Task',i+1,':'+ toDO[i].task);
}