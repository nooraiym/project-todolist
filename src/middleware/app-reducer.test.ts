import { InitialStateType, appReducer, setAppErrorAC, setAppStatusAC } from "./app-reducer";

let startState: InitialStateType;

beforeEach(() => {
  startState = {
    status: 'idle',
    error: null,
    isInitialized: false
  }
})

test('correct status should be set', ()=> {
  //action:
    const endState = appReducer(startState, setAppStatusAC('succeeded'))
  
  //expect:
    expect(endState.status).toBe('succeeded');
  })
test('correct error message should be set', ()=> {
//action:
  const endState = appReducer(startState, setAppErrorAC('some error'))

//expect:
  expect(endState.error).toBe('some error');
})
