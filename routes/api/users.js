const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../api/../../middleware/auth");

// User Model
const User = require("../../models/User");

// @route GET api/users/
// @desc Get All Users
// @access Public
router.get("/", (req, res) => {
  User.find()
    .sort({ role: -1 })
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route POST api/users/
// @desc Register new user
// @access Public
router.post("/", (req, res) => {
  const { email, name, password, role } = req.body;

  // Simple validation
  if (!email || !password || !role || !name) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "User alredy exist" });

    const newUser = new User({
      email,
      name,
      password,
      role,
    });

    // Create salt $ hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  email: user.email,
                  role: user.role,
                },
              });
            }
          );
        });
      });
    });
  });
});

// @route DELETE api/users/:id
// @desc Delte A User
// @access Public
router.delete("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => user.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});
module.exports = router;

// @route POST api/users/cambiarrol
// @desc Cambiar rol Usuario
// @access Public
router.post("/cambiarrol", (req, res) => {
  const { _id, rol } = req.body;

  // Simple validation

  User.findOne({ _id }).exec((err, user) => {
    if (err) console.log("Editar usuario error  ", err);

    user.role = rol;

    user.save();
    res.json(user);
  });
});

// @route POST api/users/hours
// @desc Add Hours
// @access Public
router.post("/hours", (req, res) => {
  const { _id, quantity, typeOf, date } = req.body;

  // Simple validation
  if (!_id || !quantity || !typeOf || !date) {
    return res.status(400).json({ msg: "Introduce todos los campos" });
  }

  const hours = {
    quantity,
    typeOf,
    date,
  };

  User.findOne({ _id }).exec((err, user) => {
    if (err) console.log("Cerrar Tarjeta  ", err);

    const arr = user.hours;

    const concatArr = arr.concat(hours);
    user.hours = concatArr;

    user.save().then((user) => res.json(user));
  });
});

// @route GET api/users/init
// @desc Add multiple users
// @access Public
// router.get("/init", (req, res) => {
//   Papa.parse(file, {
//     delimiter: ";",
//     worker: true,
//     complete: function (results) {
//       const array = results.data.map((tj) => {
//         return {
//           legajo: tj[0],
//           pin: tj[1],
//           role: tj[2],
//         };
//       });
//       array.forEach((tj) => {
//         const newUser = new User(tj);
//         newUser.save();
//       });
//       return res.json(array);
//     },
//   });
// });
