import van from "./van-1.5.2.debug.js"

const { div, h2, h3, span, section, input } = van.tags

const extractVariables = (str) => {
    const regex = /{(.*?)}/g
    const matches = []
    let match

    while ((match = regex.exec(str)) !== null) matches.push(match[1]);

    return matches
}

const VariableInput = (dataSingle, variable) => {
    return div(
        { class: "variable-item" },
        div(
            { class: "variable-name" },
            div(variable)
        ),
        input(
            {
                class: "variable-input",
                type: dataSingle.variables[variable].type,
                placeholder: dataSingle.variables[variable].placeholder,
                value: dataSingle.variables[variable].default,
            }
        )
    )
}

export const detailView = (cdt, dataIdx) => {
    const data = cdt[dataIdx]

    const commandString = data.command
    const commandVariables = extractVariables(commandString)
    const commandsInput = commandVariables.map((v, i) => {
        return VariableInput(data, v)
    })

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
                { class: "detail-command-variables-title" },
                "Variables"
            ),
            
            ...commandsInput
        )
    )
}