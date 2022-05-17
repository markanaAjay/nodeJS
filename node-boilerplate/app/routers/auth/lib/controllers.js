const controllers = {};

controllers.isEmailReceived = (req, res) => {
  const body = _.pick(req.body, ['sEmail']);
  if (!body.sEmail) return res.reply(messages.required_field('Email'));
  else return res.reply(messages.successfully('Email'));
};

module.exports = controllers;
