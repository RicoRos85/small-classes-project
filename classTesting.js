class Person {
    constructor(firstname, lastname, age, eyeColor) {
        this.firstname = firstname;
        this.lastname  = lastname;
        this.age       = age;
        this.eye       = eyeColor;
    }
    
    // Opretter en metode (ikke en funktion) til at printe det fulde navn
    fullName() {
        //console.log("WATCH " + this.errorHandling());
        this.errorHandling();
        let fullname = this.firstname + " " + this.lastname;
        return fullname;
    }

    // Check for input errors
    errorHandling() {
        try {
            // If 'first name' is empty
            if(this.firstname == "") {
                throw "Your first name is empty";
            }
            // If 'age' is not a number
            if(isNaN(this.age)) {
                throw this.age + " is not a number";
            }
        // Catch the errors
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

class Friend extends Person {
    constructor(firstname, lastname, age, eyeColor, status, interests) {
        super(firstname, lastname, age, eyeColor);
        this.status     = status;
        this.interests = interests;
    }
}


let myFather = new Person("Rolf", "Birkenborg", 50);
let myMother = new Person("Helle", "Rosenkrans", 52);
let mySelf   = new Person("Rico", "Rosenkrans", 35);
let friend1  = new Friend("Tobias", "Hansen", 30, "Brune", "Gode ven", ["IT", "Marvel", "Netflix"]);


// Display a Dad and a Mother and their @age.
console.log("Min far hedder " + myFather.fullName() + " og er " + myFather.age + " år gammel. Min mor hedder " + myMother.fullName() + " og er " + myMother.age + " år gammel");
// Display my @name and @age.
console.log("Jeg selv hedder " + mySelf.fullName() + " og jeg er " + mySelf.age + " år gammel.");
// Display my friends @name and @interests.
console.log(friend1.firstname + " er " + mySelf.fullName() + " bedste ven og han elsker " + friend1.interests + ".");