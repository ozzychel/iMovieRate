const mockData = require('../mockData');
const db = require('./index_db');

const mockUser = [mockData.user];

const insertSampleData = function (user) {
  db.model.collection.drop();
  db.model
    .create(user)
    .then((result) => {
      console.log(`MOCK_USER CREATION SUCCESS`);
      db.connection.close();
    })
    .catch((err) => console.log('MOCK_USER CREATION FAILED.', err));
};

insertSampleData(mockUser);
