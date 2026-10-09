const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const membersQueries = require('../db/queries/membersQueries');

module.exports = passport => {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, async(email, password, cb) => {
            try {
                const user = await membersQueries.findByEmail(email);
                console.log('LOOKED UP USER:', user);
                if (!user) {
                    console.log('NO USER FOUND FOR EMAIL:', email); // temp debug
                    return cb(null, false, { type: 'authFail', message: 'Incorrect email or password' });
                };

                const match = await bcrypt.compare(password, user.password);
                console.log('PASSWORD MATCH:', match);
                if (!match) {
                    return cb(null, false, { type: 'authFail', message: 'Incorrect email or password' });
                };

                return cb(null, user,);
            } catch(err) {
                cb(err);     
            }
        })
    );

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });

    passport.deserializeUser( async (id, cb) => {
        try {
            const user = await membersQueries.findById(id);
            cb(null, user);
        } catch(err) {
            cb(err);
        }
    });
};

