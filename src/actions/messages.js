export const EVENT = "EVENT"

export function onEvent (event) {

    const { data } = event
    //console.log("IS THIS AN ARRAY?", data)
    //deserialize the array
    const messages = JSON.parse(data)
    //console.log('messages test', messages)
    return {
        type: EVENT,
        payload: messages
    }
}
