const { Literatures, User, Bookmark } = require('../../models');
const Joi = require('joi');

const { Op } = require('sequelize');

exports.getLiteratures = async (req, res) => {
  const { id, title, year } = req.query;
  console.log(title);
  try {
    const data = await Literatures.findAll({
      where: {
        [Op.or]: [
          {
            id: {
              [Op.eq]: id || '',
            },
          },
          {
            [Op.and]: [
              {
                title: {
                  [Op.like]: `%${title || ''}%`,
                },
              },
              {
                year: {
                  [Op.gte]: year,
                },
              },
            ],
          },
        ],
      },

      include: [
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'userId'],
      },
      order: [['id', 'DESC']],
    });
    res.send({
      status: 'success',
      message: 'Literatures fetched successfully',
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'error',
      message: 'Internal Server Error',
      code: 500,
    });
  }
};

exports.getUserLiteratures = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Literatures.findAll({
      where: {
        userId: id,
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'userId'],
      },
      order: [
        ['status', 'ASC'],
        ['id', 'DESC'],
      ],
    });
    res.send({
      status: 'success',
      message: 'User literatures fetched successfully',
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'error',
      message: 'Internal Server Error',
      code: 500,
    });
  }
};

exports.getLiterature = async (req, res) => {
  try {
    let { id } = req.params;
    const data = await Literatures.findOne({
      where: {
        id,
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        },
        {
          model: Bookmark,
          as: 'bookmarks',
          attributes: ['userId'],
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'userId'],
      },
    });
    res.send({
      status: 'success',
      message: 'Literature fetched successfully',
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'error',
      message: 'Internal Server Error',
      code: 500,
    });
  }
};

exports.addLiterature = async (req, res) => {
  try {
    // const schema = Joi.object().keys({
    //   title: Joi.string().required(),
    //   author: Joi.string().required(),
    //   publication: Joi.string().required(),
    //   categoryId: Joi.number().required(),
    //   userId: Joi.number().required(),
    //   pages: Joi.number().required(),
    //   isbn: Joi.string().required(),
    //   about: Joi.string().required(),
    //   cover: Joi.string(),
    //   status: Joi.string().required(),
    // });

    // const { error } = schema.validate(req.body);
    // if (error)
    //   return res.status(400).send({
    //     status: 'fail',
    //     message: error.details[0].message,
    //     code: 400,
    //   });

    const { id } = await Literatures.create({
      ...req.body,
      userId: req.user.id,
      file: req.file.filename,
      status: 'Pending',
    });

    const data = await Literatures.findOne({
      where: {
        id,
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'userId'],
      },
    });
    res.send({
      status: 'success',
      message: 'Literature added successfully',
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'error',
      message: 'Internal Server Error',
      code: 500,
    });
  }
};

exports.editLiterature = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Literatures.update(req.body, {
      where: {
        id,
      },
    });

    if (!updated)
      return res.status(404).send({
        status: 'fail',
        message: 'Literature not found!',
        code: 404,
      });

    const data = await Literatures.findOne({
      where: {
        id,
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'userId'],
      },
    });

    res.send({
      status: 'success',
      message: `Literature updated successfully`,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'error',
      message: 'Internal Server Error',
      code: 500,
    });
  }
};

exports.deleteLiterature = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Literatures.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: 'success',
      message: `Literature deleted successfully`,
      data: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'error',
      message: 'Internal Server Error',
      code: 500,
    });
  }
};
