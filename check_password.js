function getPasswordChecker(password) {
    return function(actual) {
        return actual === password 
        }
    }

const check = getPasswordChecker("12345")    

console.log(check("cfvg"));
console.log(check("12345"));
console.log(check('1234'));