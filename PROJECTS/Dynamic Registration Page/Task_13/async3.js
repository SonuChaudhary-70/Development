const userForm = async function (req, res) {

    const loadForm = new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve('Form Loaded')
        }, 3000)
    })

    const enterUserName = new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve('User Name Entered')
        }, 3000)
    })

    const verifyUser = function () {
        return 'User Verified'
    }

    await loadForm
    await enterUserName
    let result = verifyUser()

    return result
}

userForm().then((m) => console.log(`Shows ${m}`))