"use strict"

import van from "./van-1.5.2.debug.js"
import { detailView } from "./detail-view-component.js"
import { loadCommandsData } from "./load-commands.js"

const { div, input, span } = van.tags

const searchInput = () => {
    return div(
        { class: "search-wrapper" },
        input(
            {
                class: "search",
                type: "text",
                placeholder: "Search...",
                oninput: (e) => {
                    const searchValue = e.target.value.toLowerCase()
                    const listItems = document.getElementsByClassName("list-item")
                    for (let i = 0; i < listItems.length; i++) {
                        const title = listItems[i].getElementsByClassName("item-title")[0].textContent.toLowerCase()
                        const description = listItems[i].getElementsByClassName("item-description")[0].textContent.toLowerCase()
                        if (title.includes(searchValue) || description.includes(searchValue)) {
                            listItems[i].style.display = ""
                        } else {
                            listItems[i].style.display = "none"
                        }
                    }
                }
            }
        )
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
                )
            )
        })
    )
}

document.addEventListener("DOMContentLoaded", async () => {
    loadCommandsData().then((data) => {
        van.add(document.body,
            div(
                { id: "app" },
                div(
                    { id: "list-view-wrapper" },
                    searchInput(),
                    listView(data)
                ),
                div(
                    { id: "detail-view-wrapper" },
                    detailView(data, 0)
                )
            )
        )
    })
})