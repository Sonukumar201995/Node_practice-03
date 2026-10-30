const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Staff = require("./models/staff"); // path check

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            console.log("Received Credentials:", username, password);

            const user = await Staff.findOne({ username });

            if (!user) {
                return done(null, false, {
                    message: "Incorrect username",
                });
            }

            //const isPassMatch = user.password === password; // Better: bcrypt.compare()
            const isPassMatch = await user.comparePassword(password);

            if (isPassMatch) {
                return done(null, user);
            } else {
                return done(null, false, {
                    message: "Incorrect password",
                });
            }
        } catch (error) {
            return done(error);
        }
    })
);

module.exports = passport;