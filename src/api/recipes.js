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

export const toggleLike = async (token, { _id, likingUserId }) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/recipes`
  const req = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ _id, likingUserId }),
  }
  const res = await fetch(url, req)
  return await res.json()
}
