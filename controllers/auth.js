const passport = require('passport');
const validator = require('validator');
const User = require("../models/User");

function validateSignupInputs(body) {
    const errors = [];
    if (!validator.isEmail(body.email))
        errors.push({ msg: "Please enter a valid email address." });
    if (!validator.isLength(body.password, { min: 8 }))
        errors.push({ msg: "Password must be at least 8 characters long" });
    if (body.password !== body.confirmPassword)
        errors.push({ msg: "Passwords do not match." });
    return errors;
}

module.exports = {
    getLogin: async(req, res) => {
        try{
            if(req.user){
                return res.redirect('/schedule');
            } else {
                return res.redirect('/');
            }
        }catch(err){
            console.log(err);
            return res.status(500).send("error occured during login");
        }
    },
    postLogin: async(req, res) => {
        try{
            const validationErrors = [];
            if (!validator.isEmail(req.body.email))
                validationErrors.push({ msg: "Please enter a valid email address." });
            if (validator.isEmpty(req.body.password))
                validationErrors.push({ msg: "Password cannot be blank." });

        if (validationErrors.length) {
            req.flash("errors", validationErrors);
            return res.redirect("/login");
        }
        req.body.email = validator.normalizeEmail(req.body.email, {
            gmail_remove_dots: false,
        });

        passport.authenticate("local", (err, user, info) => {
            if (err) {
            return next(err);
            }
            if (!user) {
            req.flash("errors", info);
            return res.redirect("/");
            }

        return new Promise((resolve, reject) => {
        req.logIn(user, (err) => {
            if (err) {
            console.error("Login error:", err);
            return reject(err);
            }
            req.flash("success", { msg: "Success! You are logged in." });

        // Log session and user info for debugging
        console.log("Logged-in user:", req.user);
        console.log("Session details:", req.session);

        const redirectPath = "/schedule";
        const finalRedirect = req.session.returnTo || redirectPath;

        req.session.returnTo = null;
        res.redirect(finalRedirect);
        resolve();
        });
        });
    });
    }catch(err){
        console.log(err);
        return res.status(500).send("error occured during login");
    }       
    },

    logout: async(req, res) => {
        try{
            req.logout((err) => {
                if(err) {
                    console.error('Logout error:', err);
                    return res.status(500).send('An error occured during logout');
                }
                if(req.session){
                    req.session.destroy((destroyErr) => {
                        if(destroyErr) {
                            console.error('Error: failed to destroy the session during logout.', destroyErr);
                        }
                        req.user = null;
                        res.redirect('/');
                    });
                } else {
                    res.redirect('/');
                }
            })

        }catch(err){
            console.log(err);
            return res.status(500).send('Error logging out');
        }
    },

    getSignup: async(req, res) => {
        try{
            if(req.user) {
                const redirectPath = '/schedule';
                return res.redirect(redirectPath);
            }
            res.render('signup.ejs', { user: req.user || null });
        } catch(err) {
            console.log(err);
            return res.status(500).send('Error getting signup');
        }
        
    },

    postSignup: async(req, res) => {
        try{
            const validationErrors = validateSignupInputs(req.body);
            if(validationErrors.length){
                req.flash('errors', validationErrors);
                return res.redirect('../signup');
            }
            req.body.email = validator.normalizeEmail(req.body.email, {
                gmail_remove_dots:false,
            });
            const userData = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            };
            const Model = User;
            const redirectPath = '/schdedule';

            const existingUser = await Model.findOne({ email: req.body.email });
            if(existingUser){
                req.flash('errors', {
                    msg: 'Account with that email address already exists.',
                });
                return res.redirect('../signup');
            }
            const newUser = new Model(userData);
            await newUser.save();

            return new Promise((resolve, reject) => {
                req.logIn(newUser, (err) => {
                    if(err) {
                        console.log('login error:', err);
                        return reject(err);
                    }
                    res.redirect(redirectPath);
                    resolve();
                });
            });
        }catch(err){
            console.log(err);
            return res.status(500).send('Error posting signup');
        }
    },
}