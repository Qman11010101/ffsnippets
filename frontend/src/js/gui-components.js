"use strict"

import van from "./van-1.5.2.debug.js"
import { loadCommandsData } from "./load-commands.js"
import { detailView } from "./detail-view-component.js"

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

const listView = async (data) => {
    return div(
        { class: "list-view" },
        ...(await data).map((item, idx) => {
            return div(
                {
                    class: "list-item",
                    "data-index": idx,
                    onclick: () => {
                        const detailViewWrapper = document.getElementById("detail-view-wrapper")
                        while (detailViewWrapper.firstChild) detailViewWrapper.removeChild(detailViewWrapper.firstChild)
                        detailViewWrapper.appendChild(detailView(data, idx))
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
                // button({
                //     onclick: () => {
                //         LoadTextFile().then((res) => {
                //             console.log(res)
                //         })
                //     }
                // }, "LOADING")
            ),
            div(
                { id: "app" },
                div(
                    { id: "list-view-wrapper" },
                    searchInput(),
                    listView(loadCommandsData())
                ),
                div(
                    { id: "detail-view-wrapper" },
                    detailView(loadCommandsData(), 0)
                )
            ),
        ]
    )
}
