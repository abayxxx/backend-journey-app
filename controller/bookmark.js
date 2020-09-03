const { User, Journey, Bookmark } = require("../models");

exports.getBookmarkUser = async (req, res) => {
  try {
    const { id } = req.params;

    const userCheck = await User.findOne({
      where: {
        id,
      },
    });

    if (!userCheck) {
      return res.status(400).send({
        error: {
          message: "User Not Found",
        },
      });
    }

    const user = await User.findAll({
      where: {
        id,
      },
      include: {
        model: Journey,
        as: "journey",
        attributes: {
          exclude: ["updatedAt", "userId", "UserId"],
        },

        through: {
          model: Bookmark,
          //   as: "user",

          attributes: {
            exclude: ["journeyId", "userId", "id", "createdAt", "updatedAt"],
          },
        },
        include: {
          model: Bookmark,
          as: "bookmark",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        include: {
          model: User,
          as: "users",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      message: "response success",
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getBookmarkJourney = async (req, res) => {
  try {
    const { id } = req.params;

    const journeyCheck = await Journey.findOne({
      where: {
        id,
      },
    });

    if (!journeyCheck) {
      return res.status(400).send({
        error: {
          message: "User Not Found",
        },
      });
    }

    const journey = await Journey.findAll({
      where: {
        id,
      },
      include: {
        model: User,
        as: "user",
        attributes: {
          exclude: ["updatedAt", "userId", "UserId"],
        },

        through: {
          model: Bookmark,
          //   as: "user",

          attributes: {
            exclude: ["journeyId", "userId", "id", "createdAt", "updatedAt"],
          },
        },
        include: {
          model: Journey,
          as: "journeys",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      message: "response success",
      data: {
        journey,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.addBookmarkUser = async (req, res) => {
  try {
    const { journeyId, userId } = req.body;

    const bookmark = await Bookmark.create({
      journeyId,
      userId,
    });

    res.status(200).send({
      message: "Success Add Bookmark",
      data: {
        bookmark,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteBookmarkUser = async (req, res) => {
  try {
    const { journeyId, userId } = req.params;

    const bookmark = await Bookmark.destroy({
      where: {
        journeyId,
        userId,
      },
    });

    if (!bookmark) {
      return res.status(400).send({
        error: {
          message: "error",
        },
      });
    }

    res.status(200).send({
      message: "Success delete Bookmark",
      data: {
        bookmark,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
