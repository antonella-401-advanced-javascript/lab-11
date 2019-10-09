const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema();

schema.static('pop', function() {
  const pipeline =
    [{
      $group: {
        _id: '$state',
        topPop: {
          $sum: '$pop'
        }
      }
    }, {
      $sort: {
        topPop: -1
      }
    }, { $limit: 10 }];

  return this.aggregate(pipeline);
});