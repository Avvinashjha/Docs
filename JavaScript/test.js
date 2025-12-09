class Person {
        // you can create a Person instance using name
        constructor(name){
            this.name = name;
        }
        // you can create a person instance by passing the json object
        static fromJSON(json){
            return new Person(json.name);
        }
    }

    const p1 = new Person("Avinash");
    const p2 = Person.fromJSON({name: "Avinash"})