//// CONTROLLER \\\\
const model = require('../models/users')
// const jwt = require('jsonwebtoken')
// const config = require('../../config')

//// NEED TO GET TOKEN IN HERE
const jwtVerify = (req, res, next) => {
//   console.log(`REQ HEADERS>>>`, req)
//   console.log(``)
	// jwt.verify(req.cookies.token, config.secret, (err, _payload) => {
	// 	if (err) {
	// 		err.status = 401
	// 		err.message = `Unauthorized...sorry!`
	// 		return next(err);
	// 	} else {
	// 		// req.payload = _payload
  //     // next()
  //     console.log(`WWWWTTTTFFF`)
		// }
	// })
}

const getAll = (req, res, next) => {
  return model.getAll()
    .then((users) => {
      res.status(200).json(users)
    })
}

const getOneUser = (req, res, next) => {
  return model.getOneUser(req.params.id)
    .catch(error => {
      return next({
        status: 404,
        message: error
      })
    })
    .then(data => {
      res.status(200).json(data)
    })
}

const create = (req, res, next) => {
  return model.create(req.body)
    .catch(errors => {
      return next({
        status: 400,
        message: `Could not create new users`,
        errors: errors
      })
    })
    .then(data => {
      res.status(201).json(data)
    })
}

const deleteOne = (req, res, next) => {
  console.log(req.params)
  return model.deleteOne(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(err => {
      const error = new Error(`Failed to delete user`)
      error.status = 503
      error.caught = err
      return next(error)
    })
}

module.exports = {
  getAll,
  getOneUser,
  create,
  deleteOne,
  jwtVerify
}