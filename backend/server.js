const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./utils/database');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const favoriteRoutes = require('./routes/favRoutes');
const collectionRoutes = require('./routes/collectionRoutes');
const followRoutes = require('./routes/followRoutes');
const User = require('./models/User');
const Recipe = require('./models/Recipe');
const Favorite = require('./models/Favorite');
const Review = require('./models/Reviews');
const Collection = require('./models/Collection');
const Follow = require('./models/Follow');
dotenv.config();


const app = express();
app.use(cors()); 
app.use(express.json()); 
User.hasMany(Recipe, { foreignKey: 'userId', onDelete: 'CASCADE' });
Recipe.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Favorite, { foreignKey: 'userId', onDelete: 'CASCADE' });
Favorite.belongsTo(User, { foreignKey: 'userId' });

Recipe.hasMany(Favorite, { foreignKey: 'recipeId', onDelete: 'CASCADE' });
Favorite.belongsTo(Recipe, { foreignKey: 'recipeId' });

User.hasMany(Review, { foreignKey: 'userId', onDelete: 'CASCADE' });
Review.belongsTo(User, { foreignKey: 'userId' });

Recipe.hasMany(Review, { foreignKey: 'recipeId', onDelete: 'CASCADE' });
Review.belongsTo(Recipe, { foreignKey: 'recipeId' });

User.hasMany(Collection, { foreignKey: 'userId', onDelete: 'CASCADE' });
Collection.belongsTo(User, { foreignKey: 'userId' });

Collection.belongsToMany(Recipe, { through: 'CollectionRecipes', foreignKey: 'collectionId' });
Recipe.belongsToMany(Collection, { through: 'CollectionRecipes', foreignKey: 'recipeId' });

User.belongsToMany(User, { through: Follow, as: 'Followers', foreignKey: 'followingId', otherKey: 'followerId' });
User.belongsToMany(User, { through: Follow, as: 'Following', foreignKey: 'followerId', otherKey: 'followingId' });

app.use('/api/auth', authRoutes);         
app.use('/api/admin', adminRoutes);         
app.use('/api/recipes', recipeRoutes);      
app.use('/api/reviews', reviewRoutes);      
app.use('/api/favorites', favoriteRoutes); 
app.use('/api/collections', collectionRoutes); 
app.use('/api', followRoutes);       

sequelize.sync({ force: false }).then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('Failed to sync database:', err);
});
