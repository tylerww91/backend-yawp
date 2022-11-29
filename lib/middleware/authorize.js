module.exports = async (req, res, next) => {
  // req.params.id ==  the id of the review you want to the delete
  // look up the review with that id in the database --- retrieve the user_id
  // req.user.id == currently logged in user
  //if review's user_id matches req.user.id ==> currently logged in user owns the
  try {
    if (!req.user || req.user.email !== 'admin')
      throw new Error('You do not have access to view this page');
    // if (req.user.id !== res.user.id || req.user.email !== 'admin')
    //   throw new Error('ACCESS DENIED');
    next();
  } catch (err) {
    err.status = 403;
    next(err);
  }
};
