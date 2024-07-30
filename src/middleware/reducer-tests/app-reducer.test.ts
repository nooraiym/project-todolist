import { AppInitialState, appReducer, setAppError, setAppStatus } from '../appSlice'

let startState: AppInitialState;

beforeEach(() => {
  startState = {
    status: 'idle',
    error: null,
    isInitialized: false,
  }
})

test('correct status should be set', () => {
  //action:
  const endState = appReducer(startState, setAppStatus({ status: 'succeeded' }))

  //expect:
  expect(endState.status).toBe('succeeded')
})
test('correct error message should be set', () => {
  //action:
  const endState = appReducer(startState, setAppError({ error: 'some error' }))

  //expect:
  expect(endState.error).toBe('some error')
})
