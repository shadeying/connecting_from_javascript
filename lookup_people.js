const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

function findPeople(firstName){
  console.log("Searching ...")
  client.query("SELECT * FROM famous_people WHERE first_name=$1", [firstName], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(`Found ${result.rows.length} person(s) by the name '${firstName}':`);

    for(let i = 0; i < result.rows.length; i++){
      const person = result.rows[i];
      console.log(`- ${person.first_name} ${person.last_name}, born '${person.birthdate.toLocaleDateString()}'`);
    }
    client.end();
  });
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  const firstName = process.argv.slice(2)[0];
  findPeople(firstName);

  });