const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

mongoose
  .connect('mongodb://localhost/imovierate', option)
  .then((result) => {
    console.log('DB CONNECTION ESTABLISHED');
  })
  .catch((err) => {
    console.log('UNABLE TO CONNECT', err);
  });

const db = mongoose.connection;

//Test connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('DATABASE CONNECTED');
});
//

const UserSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  first_name: String,
  last_name: String,
  email: {
    type: String,
    unique: true,
  },
  dob: String,
  wish_list: [
    {
      id: Number,
      title: String,
      release_date: String,
      genre_ids: [Number],
      poster_path: String,
      inList: Boolean,
    },
  ],
});

const UserClass = mongoose.model('users', UserSchema);

module.exports.model = UserClass;
module.exports.connection = db;
