const { Literature, User, Bookmark } = require('../../models');
const Joi = require('joi');

const { Op } = require('sequelize');

exports.getLiteratures = async (req, res) => {
  const { user, title, from, to, sort } = req.query;
  console.log(title);
  try {
    const data = await Literature.findAll({
      where: {
        [Op.and]: [
          user && {
            userId: {
              [Op.eq]: user || '',
            },
          },
          {
            title: {
              [Op.iLike]: `%${title || ''}%`,
            },
          },
          {
            year: {
              [Op.between]: [from || '0', to || '2020'],
            },
          },
        ],
      },

      order: [
        ['createdAt', 'DESC'],
        [sort || 'id', sort === 'title' || sort === 'status' ? 'ASC' : 'DESC'],
      ],

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

exports.getLiterature = async (req, res) => {
  try {
    let { id } = req.params;
    const data = await Literature.findOne({
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
    const { id } = await Literature.create({
      ...req.body,
      userId: req.user.id,
      file: req.file.filename.split('/')[2],
    });

    const data = await Literature.findOne({
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
    const [updated] = await Literature.update(req.body, {
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

    const data = await Literature.findOne({
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
    const data = await Literature.destroy({
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
