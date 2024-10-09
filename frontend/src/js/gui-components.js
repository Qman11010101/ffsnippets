"use strict"

import van from "./van-1.5.2.min.js"
import { commandsData } from "./load-commands-data.js"
import { LoadTextFile } from "../../wailsjs/go/main/App.js"

const { header, button, div, input, span, img } = van.tags

const searchInput = () => {
    return div(
        { class: "search-wrapper" },
        input(
            {
                class: "search",
                type: "text",
                placeholder: "Search..."
            }
        )
    )
}

const detailView = (dataIdx) => {
    const data = commandsData[dataIdx]

    // console.log(idx)
    console.log(data)

    return div(
        div(
            { class: "detail-command-title" },
            span(data.title)
        ),
        div(
            { class: "detail-command-description" },
            span(data.description)
        ),
    )
}

const listView = (data) => {
    return div(
        { class: "list-view" },
        ...data.map((item, idx) => {
            return div(
                {
                    class: "list-item",
                    "data-index": idx,
                    onclick: () => {
                        const detailViewWrapper = document.getElementById("detail-view-wrapper")
                        while (detailViewWrapper.firstChild) detailViewWrapper.removeChild(detailViewWrapper.firstChild)
                        detailViewWrapper.appendChild(detailView(idx))
                    }
                },
                div(
                    { class: "item-title" },
                    span(item.title)
                ),
                div(
                    { class: "item-description" },
                    span(item.description)
                ),
                div(
                    { class: "item-command" },
                    span(item.command)
                ),
            )
        })
    )
}

export const initialView = () => {
    const currentCommandIdx = van.state(0)
    van.add(
        document.body, ...[
            header(
                button(
                    {
                        id: "settings-button",
                    },
                    img(
                        {
                            src: "src/img/setting_gear.svg",
                            alt: "settings",
                            width: "32",
                            height: "32"
                        }
                    ),
                ),
                button({
                    onclick: () => {
                        LoadTextFile().then((res) => {
                            console.log(res)
                        })
                    }
                }, "LOADING")
            ),
            div(
                { id: "app" },
                div(
                    { id: "list-view-wrapper" },
                    searchInput(),
                    listView(commandsData)
                ),
                div(
                    { id: "detail-view-wrapper" },
                    detailView(0)
                )
            ),
        ]
    )
}
