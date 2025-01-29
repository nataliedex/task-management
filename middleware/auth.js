module.exports = {
    ensureAuth: function (req, res, next) {
      console.log("ensureAuth middleware triggered");
      if (req.isAuthenticated()) {
        if(req.user.userType === "Volunteer" && req.originalUrl === "/organization") {
          return res.redirect("/profile");
        } else if (req.user.userType === "Organization" && req.originalUrl === "profile"){
          return res.redirect("/organization");
        }
        return next();
      } else {
        res.redirect("/");
      }
    },
    ensureGuest: function (req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      } else {
        res.redirect("/dashboard");
      }
    },
  };