const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Alina:j6ecDHXjSGqxTctS@bstu-fxd25.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err =>  {
  const collection = client.db("BSTU").collection("pulpits");
  console.log(collection.find({}).toArray())
  client.close();
});