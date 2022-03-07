const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/nstodoapp';
// mongoose.connect(MONGODB_URI);




function connectToMongoDB() {
    return mongoose.connect(MONGODB_URI, (err) => {
        if (err) {
            console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
            setTimeout(connectToMongoDB, 5000);
        } else {
            console.log('connection successful');
        }
    });
}

// when connection is setup
mongoose.connection.on('connected', () => {
	console.log('Mongoose connected');
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {  
  	console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', () => {  
	mongoose.connection.close(() => { 
    	console.log('Mongoose default connection disconnected through app termination'); 
    	process.exit(0); 
  	}); 
}); 

connectToMongoDB();
