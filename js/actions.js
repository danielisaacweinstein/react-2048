export function setInitialState() {
  return {
    type: 'SET_INITIAL_STATE'
  }
}

export function shift(shiftKeyCode) {
  return {
    type: 'SHIFT',
    data: {
      keyCode: shiftKeyCode
    }
  }
}
