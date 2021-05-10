const { Router } = require("express");

// const authMiddleware = require("../auth/middleware");
// const Patient = require("../models/").patient;
const Therapist = require("../models/").therapist;

const router = new Router();

router.get("/", async (req, res) => {
  console.log("GET /therapists");

  //   const patient = req.user;

  //   const allPatients = await Patient.findAndCountAll({
  //     where: { therapistId: therapist.id },
  //   });

  try {
    const allTherapists = await Therapist.findAndCountAll();

    const relevantData = allTherapists.rows.map((element) => {
      delete element.dataValues["password"]; // don't send back the password hash

      return element.dataValues;
    });

    //   console.log("relevantData", relevantData);

    res.status(200).send(relevantData);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

module.exports = router;
