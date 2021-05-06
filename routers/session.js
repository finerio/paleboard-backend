const { Router } = require("express");

const authMiddleware = require("../auth/middleware");
const Patient = require("../models/").patient;
const Therapist = require("../models/").therapist;
const Session = require("../models/").session;

const router = new Router();

router.post("/", authMiddleware, async (req, res, next) => {
  const allSessions = await Session.findAndCountAll();

  if (allSessions && allSessions.length > 1) {
    return res.status(400).send({ message: "a session already exists" });
  }

  const therapist = req.user;

  console.log("therapist", therapist);

  const patientId = req.body.patientId;

  console.log("patientId", patientId);

  if (!therapist || !patientId) {
    return res.status(400).send({
      message: "a session must have a therapist id and a patient id",
    });
  }

  try {
    const session = await Session.create({
      therapistId: req.user.id,
      patientId: patientId,
    });

    return res.status(200).send({ message: "session created", session });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

router.get("/", authMiddleware, async (req, res, next) => {
  const patient = req.user;

  console.log("patient", patient);

  if (!patient) {
    return res.status(400).send({
      message: "patient id not provided",
    });
  }

  try {
    const session = await Session.findOne({
      where: { patientId: patient.dataValues.id },
    });

    console.log("session", session);

    return res.status(200).send({ message: "session created", session });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

router.delete("/", async (req, res, next) => {
  Session.destroy({
    where: {},
    truncate: true,
  });
});

module.exports = router;
