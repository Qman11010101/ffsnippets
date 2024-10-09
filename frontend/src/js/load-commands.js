import { LoadCommandsDataString } from "../../wailsjs/go/main/App.js"

export const loadCommandsData = async () => {
    const data = await LoadCommandsDataString()
    // console.log(JSON.parse(data))
    return JSON.parse(data)
}