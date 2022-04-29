//const permittedRoles = ["seller", "admin"];

const authorise = (permittedRoles) => {
       return (req, res, next) => {
              //getting user
              const user = req.user;
              let isPermitted = false;

              //checking if he has permitted role
              permittedRoles.map(role => {
                     if (user.role.includes(role)) {
                            isPermitted = true;
                     }
              });

              if (isPermitted) {
                     return next();
              }
              else {
                     return res.status(401).send({ message: "You are not authorised to perform operation" });
              }
       }
}
module.exports = authorise;