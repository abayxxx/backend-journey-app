const { Journey, User } = require("../models");
const joi = require("@hapi/joi");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

//Get All Trips
exports.getAllJourney = async (req, res) => {
  try {
    const journey = await Journey.findAll({
      order: [["createdAt", "DESC"]],
      attributes: {
        exclude: ["updatedAt", "userId", "UserId"],
      },
      include: {
        model: User,
        as: "users",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      },
    });

    //Send Response
    res.send({
      message: "Response Success",
      data: {
        journey,
      },
    });

    //Throw Error
  } catch (err) {
    console.log(err);
  }
};

//Get Trip by ID
exports.getJourneyById = async (req, res) => {
  try {
    //Get ID from Params
    const { id } = req.params;

    const journey = await Journey.findAll({
      where: {
        id,
      },
      attributes: {
        exclude: ["updatedAt", "userId", "UserId"],
      },
      include: {
        model: User,
        as: "users",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });

    //Send Response
    res.send({
      message: "Response Success",
      data: {
        journey,
      },
    });
    //Throw Error
  } catch (err) {
    console.log(err);
  }
};

//Get Trip by ID
exports.getJourneyByTitle = async (req, res) => {
  try {
    //Get ID from Params
    const { title } = req.params;
    console.log(req.params);

    const journey = await Journey.findAll({
      where: {
        title: {
          [Op.like]: `%${title}%`,
        },
      },
      attributes: {
        exclude: ["updatedAt", "userId", "UserId"],
      },
      include: {
        model: User,
        as: "users",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });

    //Send Response
    res.send({
      message: "Response Success",
      data: {
        journey,
      },
    });
    //Throw Error
  } catch (err) {
    console.log(err);
  }
};

//Get Trip by ID
exports.getJourneyUser = async (req, res) => {
  try {
    //Get ID from Params
    const { id } = req.params;

    const journey = await Journey.findAll({
      where: {
        userId: id,
      },
      attributes: {
        exclude: ["updatedAt", "userId", "UserId"],
      },
      include: {
        model: User,
        as: "users",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });

    //Send Response
    res.send({
      message: "Response Success",
      data: {
        journey,
      },
    });
    //Throw Error
  } catch (err) {
    console.log(err);
  }
};

//Add Data Trip
exports.addJourney = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).send({
        error: {
          message: "Please INSERT a valid data !!",
        },
      });
    }

    const journey = await Journey.create(req.body);

    //Send Response
    res.status(200).send({
      message: "Success Add data",
      data: {
        journey,
      },
    });
    //Throw ERROR
  } catch (err) {
    console.log(err);
  }
};

//Delete Trip
exports.deleteTrip = async (req, res) => {
  try {
    //Get ID from Params
    const { id } = req.params;

    const trip = await Trip.destroy({
      where: {
        id,
      },
    });

    if (!trip) {
      return res.status(400).send({
        error: {
          message: `Cannot delete, trip with Id ${id} not found `,
        },
      });
    }

    //Send Response
    res.status(200).send({
      message: "Success Delete Trip",
    });
    //Throw Error
  } catch (err) {
    console.log(err);
  }
};

// //Update
// exports.updateTrip = async (req, res) => {
//   try {
//     //Get ID from Params
//     const { id } = req.params;

//     //Check ID tripp
//     const checkTrip = await Trip.findOne({
//       where: {
//         id,
//       },
//     });

//     const trip = await Trip.update(
//       { ...req.body },
//       {
//         where: {
//           id,
//         },
//       }
//     );

//     if (!checkTrip) {
//       return res.status(400).send({
//         error: {
//           message: `Cannot update, trip with Id ${id} not found `,
//         },
//       });
//     }

//     //Send Response
//     res.status(200).send({
//       message: "Success Update Trip",
//     });
//     //Throw Error
//   } catch (err) {
//     console.log(err);
//   }
// };
