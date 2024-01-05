import bent from 'bent'

/**
 * Represents a CRUD API request.
 * For more information about the API, visit: https://crudapi.co.uk/help/api-docs
 */
export default class CrudApiRequest {
  /**
   * Creates a new instance of CrudApiRequest.
   * @param {string} urlApi - The URL of the API example: https://crudapi.co.uk/api/v1/.
   * @param {string} apiKey - The API key, generated here: https://crudapi.co.uk/app/keys.
   * @param {boolean} [debug=false] - Whether to enable debug mode, which logs errors to the console.
   */
  constructor (urlApi, apiKey, debug = false) {
    this.apiKey = apiKey
    this.debug = debug
    this.path = urlApi
    this.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`
    }
  }

  /**
   * Retrieves data from a collection.
   * @param {string} collectionName - The name of the collection.
   * @param {string|null} filterById - The ID used to filter the data (optional).
   * @param {boolean} formatJSON - Indicates whether the data should be formatted as JSON (default: true).
   * @returns {Promise<Array<Obj>|Obj>} - A Promise that resolves to an array of objects or a single object.
   */
  async get (collectionName, filterById = null, formatJSON = true) {
    const filter = filterById ? `${collectionName}/${filterById}` : collectionName
    return this.exe(filter, 'GET', formatJSON)
  }

  /**
   * Sends a POST request to create new data in the API.
   * @param {string} collectionName - The name of the collection.
   * @param {object} payload - The data to be sent in the request body.
   * @returns {Promise<any>} - The response from the API.
   */
  async post (collectionName, payload) {
    return this.exe(collectionName, 'POST', true, [payload])
  }

  /**
   * Sends a PUT request to update existing data in the API.
   * @param {string} collectionName - The name of the collection.
   * @param {string} collectionId - The ID of the item to be updated.
   * @param {object} payload - The data to be sent in the request body.
   * @param {boolean} [formatJSON=true] - Whether to parse the response as JSON.
   * @returns {Promise<any>} - The response from the API.
   */
  async put (collectionName, collectionId, payload, formatJSON = true) {
    return this.exe(`${collectionName}/${collectionId}`, 'PUT', formatJSON, payload)
  }

  /**
   * Sends a DELETE request to delete data from the API.
   * @param {string} collectionName - The name of the collection.
   * @param {string} collectionId - The ID of the item to be deleted.
   * @returns {Promise<any>} - The response from the API.
   */
  async delete (collectionName, collectionId) {
    return this.exe(`${collectionName}/${collectionId}`, 'DELETE', true)
  }

  /**
   * Executes the API request.
   * @param {string} route - The route of the API endpoint.
   * @param {string} method - The HTTP method of the request.
   * @param {boolean} formatJSON - Whether to parse the response as JSON.
   * @param {object} [payload={}] - The data to be sent in the request body.
   * @returns {Promise<any>} - The response from the API.
   */
  async exe (route, method, formatJSON, payload = {}) {
    try {
      const responseFormat = formatJSON ? 'json' : 'string'
      const execute = bent(this.path, responseFormat, method, [200, 201, 403])
      const payload_ = method === 'GET' ? null : payload
      const response = await execute(route, payload_, this.headers)
      return response
    } catch (error) {
      if (this.debug) {
        console.log('\n( Request.js -> exe() -> error): ', error.message || error, '\n')
      }
      const errorMessage = error.message || error
      throw errorMessage
    }
  }
}
