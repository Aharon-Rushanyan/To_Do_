const API_URL = `https://todo.eachbase.com/api/AharonRushanyan/todos`

const Api = {
  GET_TO_DO: `${API_URL}`,
  ADD_TO_DO: `${API_URL}/`,
  REMOVE_TO_DO: `${API_URL}/:todoId`,
  UPDATE_TO_DO: `${API_URL}/:todoId`,
}
export default Api
