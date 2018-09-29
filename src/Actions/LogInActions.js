export function changeMessage(messagePackage) {
    return {
        type: "CHANGEMESSAGE",
        payload: messagePackage
    };
}