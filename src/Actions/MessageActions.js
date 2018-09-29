export function changeMessage(message) {
  return {
    type: "CHANGE",
    payload: message
  };
}

export function changeMessageColor(messageColor) {
  return {
    type: "CHANGECOLOR",
    payload: messageColor
  };
}

export function changeVerifyMessage(message) {
  return {
    type: "CHANGEVERIFY",
    payload: message
  };
}

export function changeVerifyMessageColor(messageColor) {
  return {
    type: "CHANGEVERIFYCOLOR",
    payload: messageColor
  }
}
