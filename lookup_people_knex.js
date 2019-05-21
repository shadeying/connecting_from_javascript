const knex = require("knex")({
  client: "pg",
  connection: require("./settings")
});

function findPeople(firstName){
  console.log("Searching ...")
  knex("famous_people").where("first_name", firstName).asCallback((err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(`Found ${result.length} person(s) by the name '${firstName}':`);

    for(let i = 0; i < result.length; i++){
      const person = result[i];
      console.log(`- ${person.first_name} ${person.last_name}, born '${person.birthdate.toLocaleDateString()}'`);
    }
    knex.destroy();
  });
}


const firstName = process.argv.slice(2)[0];
findPeople(firstName);