// const mongoose = require("mongoose");

// module.exports = () => {
// 	const connectionParams = {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	};
// 	try {
// 		mongoose.connect(process.env.DB, connectionParams);
// 		console.log("Connected to database successfully");
// 	} catch (error) {
// 		console.log(error);
// 		console.log("Could not connect database!");
// 	}
// };
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,// enable the new MongoDB connection string parser in Mongoose.
        useUnifiedTopology: true,//enable the new Server Discovery and Monitoring engine in Mongoose.
    };

    mongoose.connect(process.env.DB, connectionParams)
        .then(() => {
            console.log("Connected to database successfully");
        })
        .catch((error) => {
            console.error("Error connecting to database:", error.message);
        });
};

