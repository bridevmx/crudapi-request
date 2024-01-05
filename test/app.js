import CrudApiRequest from '../index.js'
/**
 * Executes multiple HTTP requests to the CRUD API and logs the responses.
 * For execution, needs a valid API key, generated here: https://crudapi.co.uk/app/keys.
 * @async
 * @function test
 * @param {string} apiKey - The API key used for authentication.
 * @returns {Promise<void>}
 * @throws {Error} If an error occurs during the requests.
 */

async function test (apiKey) {
  const request = new CrudApiRequest('https://crudapi.co.uk/api/v1/', apiKey, true)
  const _statusApi = await request.get('probe')
  const _save = await request.post('posts', { title: 'My first post' })
  const _create = await request.post('users', { name: 'Juan Doe' })
  const _get = await request.get('posts')
  const _filterById = await request.get('posts', _save?.items[0]?._uuid)
  const _edit = (_create?.items?.length > 0) ? await request.put('users', _create?.items[0]?._uuid, { name: 'John Doe' }) : null
  const _delete = (_create?.items?.length > 0) ? await request.delete('users', _create?.items[0]?._uuid) : null
  console.log(

    '\n\n\n( app.js -> GET -> _statusApi): ', _statusApi,
    '\n\n\n( app.js -> POST -> _save): ', _save,
    '\n\n\n( app.js -> POST -> _create): ', _create,
    '\n\n\n( app.js -> GET -> _get): ', _get,
    '\n\n\n( app.js -> GET -> _filterById): ', _filterById,
    '\n\n\n( app.js -> PUT -> _edit): ', _edit,
    '\n\n\n( app.js -> DELETE -> _delete): ', _delete,
    '\n\n\n( app.js -> Finaly): ', 'END'

  )
}
(async () => {
  try {
    const args = process.argv.slice(2)
    const token = args[0]
    if (!token) {
      throw new Error('No API key provided, please provide a valid API key as an argument, ej.(npx run test -- <API_KEY>))')
    }
    test(token)
  } catch (error) {
    console.log('Error: ', error.message)
  }
})()
