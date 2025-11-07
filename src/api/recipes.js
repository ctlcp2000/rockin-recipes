export const getRecipes = async (queryParams) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/recipes?` +
      new URLSearchParams(queryParams),
  )
  return await res.json()
}

export const createRecipe = async (token, recipe) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(recipe),
  })
  return await res.json()
}

export const toggleLike = async (token, {_id, likingUserId}) => {
  const req = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: {_id, likingUserId}
  }
  console.log(req)
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/recipes/like`, req)
  return await res.json()
}