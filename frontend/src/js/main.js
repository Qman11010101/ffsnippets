import van from "./van-1.5.2.min.js";

const { p, div, input } = van.tags;

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

const listView = () => {
    return div(
        { class: "list-view" },
        div(
            { class: "list-item" },
            "list 1"
        ),
        div(
            { class: "list-item" },
            "list 2"
        ),
        div(
            { class: "list-item" },
            "list 3"
        ),
        div(
            { class: "list-item" },
            "list 4"
        ),
        div(
            { class: "list-item" },
            "list 5"
        ),
        div(
            { class: "list-item" },
            "list 6"
        ),
        div(
            { class: "list-item" },
            "list 7"
        ),
        div(
            { class: "list-item" },
            "list 8"
        ),
        div(
            { class: "list-item" },
            "list 9"
        ),
        div(
            { class: "list-item" },
            "list 10"
        ),
        div(
            { class: "list-item" },
            "list 11"
        ),
        div(
            { class: "list-item" },
            "list 12"
        ),
        div(
            { class: "list-item" },
            "list 13"
        ),
        div(
            { class: "list-item" },
            "list 14"
        ),
        div(
            { class: "list-item" },
            "list 15"
        ),
        div(
            { class: "list-item" },
            "list 16"
        ),
    )
}

document.addEventListener("DOMContentLoaded", () => {
    van.add(
        document.body, div(
            { id: "app" },
            div(
                { id: "list-view-wrapper" },
                searchInput(),
                listView()
            ),
            div(
                { id: "detail-view-wrapper" },
                "Detail view"
            )
        )
    )
})