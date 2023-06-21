
class User {
    static count = 0;
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
        User.count++
    }
    printNumberOfUsers() {
        console.log("currentnumberofusers =", User.count)
    }
}

class Member extends User {
    constructor(username, email, password) {

        super(username, email, password);     // complete the super function only. Do not make any other changes

        this.membershipactivetilldate = new Date(2023, 2, 3)//assume user has joined ur platform on 3rd March
        this.package = '';
    }

    //Based on the package bought, increase the membershipactivetilldate
    //Monthly membership increases the va1idity by 1 month
    //Yearly membership increases the va1idity by 1 year
    renewMembership() {
        let membershipactivetilldateYear = this.membershipactivetilldate.getFullYear()
        let membershipactivetilldateMonth = this.membershipactivetilldate.getMonth()
        let membershipactivetilldateDay = this.membershipactivetilldate.getDay()
        if (this.package === 'YEARLYPACKAGE') {
            this.membershipactivetilldate = new Date(
                membershipactivetilldateYear + 1,
                membershipactivetilldateMonth,
                membershipactivetilldateDay - 2
            )
        } else {
            this.membershipactivetilldate = new Date(
                membershipactivetilldateYear,
                membershipactivetilldateMonth + 1,
                membershipactivetilldateDay - 2
            )
        }
    }
    purchaseMembership(membershippackagename) {

        //   Complete this function
        this.package = membershippackagename
        this.renewMembership()

    }

    subscriptionActiveTill() {
        console.log(
            this.username +
            " is subscribed to " +
            this.package +
            " uptill " +
            this.membershipactivetilldate.toDateString()
        );
    }

}

function createNewStudents(username, email, password, membershippackagename) {
    const mike = new Member(username, email, password);
    mike.purchaseMembership(membershippackagename);
    mike.subscriptionActiveTill();

}

async function readInput() {
    let inputString = '';
    var output = [];
    process.stdin.on('data', inputStdin => {
        inputString += inputStdin;
        const inputArr = inputString.split(/(?:\r\n|\r|\n)/g)
        const argumentsArr = inputArr[0].split(',');
        createNewStudents(argumentsArr[0], argumentsArr[1], argumentsArr[2], argumentsArr[3])
        process.exit();

    })


}
readInput();