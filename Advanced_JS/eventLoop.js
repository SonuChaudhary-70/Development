function fun1() {
    console.log('first statement')
}

function fun2() {
    setTimeout(() => console.log('second statement'), 1000);
}

function fun3() {
    console.log('third statement');
}

fun1()
fun2()  // in this settimeout is attach which is callback function hence it goes to call back queue then after 1s event loop push this fn into callStack
fun3()
