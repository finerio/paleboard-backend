const bcrypt = require("bcrypt");
const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");
const Patient = require("../models/").patient;
const Therapist = require("../models/").therapist;
const { SALT_ROUNDS } = require("../config/constants");

const router = new Router();

router.post("/login-therapist", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Please provide both email and password" });
    }

    const therapist = await Therapist.findOne({ where: { email } });

    if (!therapist || !bcrypt.compareSync(password, therapist.password)) {
      return res.status(400).send({
        message: "User with that email not found or password incorrect",
      });
    }

    delete therapist.dataValues["password"]; // don't send back the password hash

    // use email (rather than id) in order to create the token

    const token = toJWT({ therapistEmail: therapist.email });
    return res.status(200).send({ token, ...therapist.dataValues });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

router.post("/login-patient", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Please provide both email and password" });
    }

    const patient = await Patient.findOne({ where: { email } });

    if (!patient || !bcrypt.compareSync(password, patient.password)) {
      return res.status(400).send({
        message: "User with that email not found or password incorrect",
      });
    }

    delete patient.dataValues["password"]; // don't send back the password hash

    // use email (rather than id) in order to create the token

    const token = toJWT({ patientEmail: patient.email });
    return res.status(200).send({ token, ...patient.dataValues });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

router.post("/signup-therapist", async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).send("Please provide an email, password and a name");
  }

  // check if this email is already in use in the patients table:

  const patient = await Patient.findOne({ where: { email } });

  // if it is, respond with an error:

  if (patient) {
    return res
      .status(400)
      .send({ message: "There is an existing account with this email" });
  }

  try {
    const newTherapist = await Therapist.create({
      email,
      password: bcrypt.hashSync(password, SALT_ROUNDS),
      name,
    });

    delete newTherapist.dataValues["password"]; // don't send back the password hash

    // use email (rather than id) in order to create the token

    const token = toJWT({ therapistEmail: newTherapist.email });

    res.status(201).json({ token, ...newTherapist.dataValues });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .send({ message: "There is an existing account with this email" });
    }

    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

router.post("/signup-patient", async (req, res) => {
  const { email, password, name, therapistId } = req.body;

  if (!email || !password || !name || !therapistId) {
    return res
      .status(400)
      .send("Please provide an email, password, name, and therapist ID");
  }

  // check if this email is already in use in the therapists table:

  const therapist = await Therapist.findOne({ where: { email } });

  // if it is, respond with an error:

  if (therapist) {
    return res
      .status(400)
      .send({ message: "There is an existing account with this email" });
  }

  try {
    const newPatient = await Patient.create({
      email,
      password: bcrypt.hashSync(password, SALT_ROUNDS),
      name,
      therapistId,
    });

    delete newPatient.dataValues["password"]; // don't send back the password hash

    // use email (rather than id) in order to create the token

    const token = toJWT({ patientEmail: newPatient.email });

    res.status(201).json({ token, ...newPatient.dataValues });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .send({ message: "There is an existing account with this email" });
    }

    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

// The /me endpoint can be used to:
// - get the users email & name using only their token
// - checking if a token is (still) valid
router.get("/me", authMiddleware, async (req, res) => {
  // don't send back the password hash
  delete req.user.dataValues["password"];
  res.status(200).send({ ...req.user.dataValues });
});

module.exports = router;
