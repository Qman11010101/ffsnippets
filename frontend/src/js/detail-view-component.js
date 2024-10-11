import van from "./van-1.5.2.debug.js"
import { GetFilePath, ExecuteCommand } from "../../wailsjs/go/main/App.js"
import { EventsOn } from "../../wailsjs/runtime"

const { div, h2, h3, span, section, input, img, button, p } = van.tags

let commandVariables
let currentCommand

EventsOn("command-output-err", (output) => {
    const outputElm = document.getElementById("detail-command-output")
    outputElm.appendChild(p({ class: "output-err" }, output))

    // auto scroll to bottom
    outputElm.scrollTop = outputElm.scrollHeight
})

EventsOn("command-exit-code", (code) => {
    const errorCodeElm = document.getElementById("error-code")
    errorCodeElm.innerText = code
})

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
                    oninput: () => {
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
            ),
            div(
                { class: "detail-command-buttons-wrapper" },
                button(
                    {
                        class: "detail-command-button",
                        onclick: () => {

                        }
                    },
                    "Copy"
                ),
                button(
                    {
                        class: "detail-command-button",
                        onclick: async () => {
                            // check if the command has empty variable (placeholder "{***}" remaining)
                            for (let i = 0; i < commandVariables.length; i++) {
                                if (document.getElementById(commandVariables[i]).value === "") {
                                    alert("Please fill all the variables")
                                    return
                                }
                            }

                            const command = replaceCommandVariablesWithData(originCommandString, data, false)
                            document.getElementById("detail-command-output").innerText = ""
                            document.getElementById("error-code").innerText = ""

                            ExecuteCommand(command)
                        }
                    },
                    "Execute"
                ),
            )
        ),
        section(
            {
                class: "detail-command-output-wrapper",
            },
            h3(
                { class: "detail-command-h3" },
                "Output"
            ),
            div(
                { id: "detail-command-output" }
            ),
            div(
                { class: "error-code-wrap" },
                span("Error Code: "),
                span({ id: "error-code" })
            )
        )
    )
}