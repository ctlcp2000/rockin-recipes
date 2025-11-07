import { Recipe } from '../db/models/recipe.js'
import { User } from '../db/models/user.js'

export async function createRecipe(
  userId,
  { title, contents, tags, imageUrl, likes },
) {
  const recipe = new Recipe({ title, author: userId, contents, tags, imageUrl, likes })
  return await recipe.save()
}

export async function toggleLike(
  _id, likingUserId
) {
  const existingRecipe = await getRecipeById(_id)
  const newLikes = existingRecipe.includes(likingUserId) ? existingRecipe.likes.filter(item => item !== likingUserId) : existingRecipe.likes.push(likingUserId)

  return await Recipe.findOneAndUpdate(
    { _id: _id },
    { $set: { likes: newLikes } },
    { new: true },
  )
}

async function listRecipes(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  return await Recipe.find(query).sort({ [sortBy]: sortOrder })
}

export async function listAllRecipes(options) {
  return await listRecipes({}, options)
}

export async function listRecipesByAuthor(authorUsername, options) {
  const user = await User.findOne({ username: authorUsername })
  if (!user) return []
  return await listRecipes({ author: user.id }, options)
}

export async function listRecipesByTag(tags, options) {
  return await listRecipes({ tags }, options)
}

export async function getRecipeById(recipeId) {
  return await Recipe.findById(recipeId)
}

export async function updateRecipe(
  userId,
  recipeId,
  { title, contents, tags, imageUrl, likes },
) {
  return await Recipe.findOneAndUpdate(
    { _id: recipeId, author: userId },
    { $set: { title, contents, tags, imageUrl, likes } },
    { new: true },
  )
}

export async function deleteRecipe(userId, recipeId) {
  return await Recipe.deleteOne({ _id: recipeId, author: userId })
}
