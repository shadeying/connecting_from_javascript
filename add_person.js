const knex = require("knex")({
  client: "pg",
  connection: require("./settings"),
  useNullAsDefault: true
});

function addPeople(firstName,lastName,birthDate){
  console.log("Adding ...")
  knex("famous_people").insert({
      "first_name": firstName,
      "last_name": lastName,
      "birthdate": birthDate})
    .asCallback((err, result) => {
      if (err) {
        return console.error("error running query", err);
      }
      console.log("Added!")
      knex.destroy();
  });
}


const firstName = process.argv.slice(2)[0];
const lastName = process.argv.slice(2)[1];
const birthDate = process.argv.slice(2)[2];
addPeople(firstName, lastName, birthDate);