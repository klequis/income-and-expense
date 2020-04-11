import fetch from 'cross-fetch'
import { getTokenSilently } from 'react-auth0-spa'
import config from 'config'
import ApiError from './aipError'

// eslint-disable-next-line
import { orange, red, redf, purple } from 'logger'

const logApiError = (from = 'not specified', e) => {
  console.group(`API Error from: ${from}`)
  purple('message', e.message)
  purple('statusNumber', e.statusNumber)
  purple('statusText', e.statusText)
  purple('url', e.url)
  purple('validationErrors', e.validationErrors)
  console.groupEnd()
}

const logRequest = ({from='not specified', url, options, headers}) => {
  if (config.dev.logRequest) {
    
    console.group(`logRequest from ${from}`)
    orange('url', url)
    orange('options', options)
    orange('headers', headers)
    console.groupEnd()
  }
}

const logResponse = ({from='not specified', res}) => {
  if (config.dev.logResponse) {
    const { status, statusText, url } = res
    console.group(`logResponse from ${from}`)
    orange('status', status)
    orange('statusText', statusText)
    orange('url', url)
    console.groupEnd()
  }
    
}

// const formatError = (status, statusText, url = '', validationErrors = []) => {
//   // orange(`status: ${status}, statusText: ${statusText}, url: ${url}, validationErrors: ${validationErrors}`)
//   orange('formatError: validationErrors ', validationErrors)
//   const r1 = {
//     status,
//     statusText,
//     url,
//     validationErrors: validationErrors || []
//   }
//   // const r2 = JSON.stringify(r1)
//   return r1
// }

const stripLeadingForwardSlash = path => {
  const r = path.startsWith('/') ? path.substring(1) : path
  return r
}

const getFullUri = (nodeEnv, route) => {
  let r
  if (nodeEnv === 'production') {
    red('WARN next line not tested')
    r = `${config.api.apiRootUrlProd}${stripLeadingForwardSlash(route)}`
  } else {
    r = `${config.api.apiRootUriDev}${stripLeadingForwardSlash(route)}`
  }
  return r
}

const getToken = async () => {
  try {
    return await getTokenSilently()
  } catch (e) {
    const msg = '[api-helpers.getToken] ERROR: error fetching token'
    redf(msg, e)
    throw new Error(msg, e)
  }
}

const getIt = async (url, options = {}) => {
  try {
    const token = await getToken()

    let headers = {
      ...options.headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }

    const env = process.env.NODE_ENV
    const fullUrl = getFullUri(env, url)

    logRequest({
      from:'getIt', 
      url: fullUrl, 
      options,
      headers
    })

    const r1 = await fetch(fullUrl, {
      ...options,
      headers
    })
    logResponse({from: 'getIt', res: r1})
    return r1
  } catch (e) {
    throw e
  }
}

export const fetchJson = async (url, options = {}) => {
  logRequest({
    from:'getIt', 
    url: url, 
    options,
  })
  const r = await getIt(url, options)
  const { status, statusText, url: resUrl } = r

  // purple(`fetchJson: url ${url}, status ${status}`)
  if (status >= 200 && status < 300) {
    // orange('status OK')
    return await r.json()
  }
  if (status === 422) {
    // orange('fetchJson: errors', errors)
    const body = await r.json()
    // orange('fetchJson 422: body', body)
    const { errors } = body
    // orange('fetchJson 422: errors', errors)
    // throw new Error(
    //   `${status} - ${statusText}`,
    //   formatError(status, statusText, resUrl, errors)
    // )
    purple('>> apiHelpers: THROWING')
    const apiErr = new ApiError({ status, statusText, resUrl, errors })
    logApiError('fetchJson 422', apiErr)
    throw apiErr
  } else {
    // TODO: not sure what to do here
  }
  // } catch (e) {
  //   // purple('>> apiHelpers: CATCH - caught my own throw')
  //   let err
  //   // purple('>> apiHelpers: e.message', e.message)
  //   // purple('>> apiHelpers: e', e)
  //   if (e.message === 'Network request failed') {
  //     // A network error doesn't have the same format as an error from
  //     // the api. However, the action & reducer is expecting the api
  //     // error format so format it as such
  //     // err = formatError(503, 'Network request failed')
  //     err = e
  //   } else {
  //     err = e
  //   }
  //   purple('>>fetchJson catch err:', err)
  //   throw err
  // }
}

export default { fetchJson }
