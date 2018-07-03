'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, UUID, UUIDV1 } = app.Sequelize;

  const Post = app.model.define('posts', {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV1,
      autoIncrement: true,
    },
    title: STRING(30),
    content: STRING(255),
    user_id: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  Post.associate = function() {
    app.model.Post.belongsTo(app.model.User, { as: 'user', foreignKey: 'user_id' });
  };


  return Post;
};
