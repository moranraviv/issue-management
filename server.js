const express = require ('express');
const issuesRoutes = require('./app/routes/issue.routes'); 
const db = require('./app/models');

const startApplication = async function() {
  try {
    console.log("Start application");

    // connect to db
    await db.mongoose.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to database");

    // configure web api
    const app = express();
    app.use(express.json());
    app.use('/issues', issuesRoutes);

    // start listening
    const listener = app.listen(process.env.PORT || 8080, () => {
      console.log('Application is listening on port ' + listener.address().port);
    });
  }
  catch (error) {
    console.log("Failed to start application", error);
    process.exit();
  }
};

startApplication();