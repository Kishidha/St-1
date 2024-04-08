const router = require("express").Router();
const { User } = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
    try {
        // Validate user input
		
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        // Check if the user already exists
        let user = await User.findOne({ email: req.body.email });
        if (user)
            return res.status(409).send({ message: "User with given email already exists!" });

        // Generate a new token for the user
        const token = crypto.randomBytes(32).toString("hex");// generates a buffer of 32 random bytes 

        // Create a new user document and save it
        const salt = await bcrypt.genSalt(Number(process.env.SALT));//which is a random value used in password hashing.
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        user = await new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashPassword
        }).save();

        // Create a new token document and associate it with the user
        const newToken = new Token({
            userId: user._id,
            token: token
        });
        await newToken.save();

        // Send verification email with the token
        const url = `${process.env.BASE_URL}users/${user._id}/verify/${token}`;
        await sendEmail(user.email, "Verify Email", url);

        // Send response
        res.status(201).send({ message: "An Email sent to your account. Please verify." });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});


const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;
