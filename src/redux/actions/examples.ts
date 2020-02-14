export const LOADING = 'loading'
export const LOADED = 'loaded'
export const ERROR = 'error'

const loading = () => ({
  type: LOADING
})

const loaded = (payload: any) => ({
  type: LOADED,
  payload
})

const error = (error: Error) => ({
  type: ERROR
})

export function fetchPosts() {
  return (dispatch: any) => {
    dispatch(loading())

    return fetch('https://www.reddit.com/r/reactjs.json')
      .then(response => response.json())
      .then(json => dispatch(loaded(json)))
      .catch(err => dispatch(error(err)))
  }
}
