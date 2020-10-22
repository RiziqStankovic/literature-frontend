const { User } = require('../../models');

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await User.update(
      {
        ...req.body,
        photo: req.file.filename,
      },
      {
        where: {
          id,
        },
      }
    );

    if (!updated)
      return res.status(404).send({
        status: 'fail',
        message: 'User not found!',
        code: 404,
      });

    const data = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    });

    res.send({
      status: 'success',
      message: `User updated successfully`,
      data,
      path: req.file.path,
    });
  } catch (error) {
    res.status(500).send({
      status: 'error',
      message: 'Internal Server Error',
      code: 500,
    });
  }
};
