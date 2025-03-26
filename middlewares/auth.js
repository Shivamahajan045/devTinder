const adminAuth = (req, res, next) => {
  console.log("Admin auth is checking");
  const token = "xyz";
  const isAuthorized = token == "xyz";
  if (!isAuthorized) {
    res.status(404).send("Unauthorized request!");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("User  auth is checking");
  const token = "xyz";
  const isAuthorized = token == "xyz";
  if (!isAuthorized) {
    res.status(404).send("Unauthorized request!");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
