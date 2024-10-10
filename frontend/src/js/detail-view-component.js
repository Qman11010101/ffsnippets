import van from "./van-1.5.2.debug.js"
import { GetFilePath } from "../../wailsjs/go/main/App.js"

const { div, h2, h3, span, section, input, img, button } = van.tags

let commandVariables
let currentCommand

const replaceCommandVariablesWithData = (command, data, isInitialize) => {
    let finalCommand = command
    Object.keys(data.variables).forEach((v) => {
        const replaceValue = isInitialize ? data.variables[v].default : document.getElementById(v).value
        if (replaceValue !== "") finalCommand = finalCommand.replaceAll(`{${v}}`, replaceValue)
    })

    return finalCommand
}

const extractVariables = (str) => {
    const regex = /{(.*?)}/g
    const matches = []
    let match

    while ((match = regex.exec(str)) !== null) matches.push(match[1])

    return matches
}

const VariableInput = (dataSingle, variable) => {
    let inputElement
    if (dataSingle.variables[variable].type === "file") {
        inputElement = div(
            {
                class: "variable-input-wrapper",
            },
            input(
                {
                    class: "variable-input",
                    id: variable,
                    type: "text",
                    placeholder: dataSingle.variables[variable].placeholder,
                    value: dataSingle.variables[variable].default,
                    oninput: (e) => {
                        const finalCommandElm = document.getElementById("command-result")
                        finalCommandElm.innerText = replaceCommandVariablesWithData(dataSingle.command, dataSingle, false)
                    }
                }
            ),
            button(
                {
                    class: "custom-file-input-reference",
                    onclick: async () => {
                        const path = await GetFilePath()
                        const variableInput = document.getElementById(variable)
                        variableInput.value = path
                        variableInput.scrollLeft = variableInput.scrollWidth

                        if (variable === "input") {
                            const outputVariableInput = document.getElementById("output")
                            outputVariableInput.value = path
                            outputVariableInput.scrollLeft = outputVariableInput.scrollWidth
                        }
                    }
                },
                "Select file"
            )
        )
    } else {
        inputElement = div(
            {
                class: "variable-input-wrapper",
            },
            input(
                {
                    class: "variable-input",
                    id: variable,
                    type: dataSingle.variables[variable].type,
                    placeholder: dataSingle.variables[variable].placeholder,
                    value: dataSingle.variables[variable].default,
                    oninput: (e) => {
                        const finalCommandElm = document.getElementById("command-result")
                        finalCommandElm.innerText = replaceCommandVariablesWithData(dataSingle.command, dataSingle, false)
                    }
                }
            )
        )
    }
    return div(
        { class: "variable-item" },
        div(
            { class: "variable-name" },
            div(variable)
        ),
        inputElement
    )
}

export const detailView = (cdt, dataIdx) => {
    const data = cdt[dataIdx]

    let originCommandString = data.command
    commandVariables = extractVariables(originCommandString)
    const commandsInput = commandVariables.map((v) => {
        return VariableInput(data, v)
    })

    // console.log(data)
    let commandString = replaceCommandVariablesWithData(originCommandString, data, true)

    return div(
        section(
            h2(
                { class: "detail-command-title" },
                data.title
            ),
            div(
                { class: "detail-command-description" },
                span(data.description)
            )
        ),
        section(
            h3(
                { class: "detail-command-h3" },
                "Variables"
            ),
            ...commandsInput
        ),
        section(
            h3(
                { class: "detail-command-h3" },
                "Full command"
            ),
            div(
                {
                    class: "detail-command-result",
                    id: "command-result"
                },
                commandString
            )
        )
    )
}