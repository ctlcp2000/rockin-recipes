import { initDatabase } from './db/init.js'
import { Recipe } from './db/models/recipe.js'

await initDatabase()
const recipe = new Recipe({
  title: 'Hello Mongoose!',
  author: 'Daniel Bugl',
  contents: 'This recipe is stored in a MongoDB database using Mongoose.',
  tags: ['mongoose', 'mongodb'],
})

const createdRecipe = await recipe.save()
await Recipe.findByIdAndUpdate(createdRecipe._id, {
  $set: { title: 'Hello again, Mongoose!' },
})
const recipes = await Recipe.find()
console.log(recipes)
