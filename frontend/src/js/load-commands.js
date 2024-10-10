import { LoadCommandsDataString } from "../../wailsjs/go/main/App.js"

export const loadCommandsData = async () => {
    const data = await LoadCommandsDataString()
    return JSON.parse(data)
}