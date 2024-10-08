import van from "./van-1.5.2.min.js";

const { p, div, input, span } = van.tags;

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
            div(
                { class: "item-title"},
                span("動画を圧縮する(crf)"),
            ),
            div(
                { class: "item-description" },
                span("crf引数を指定して動画を圧縮します。"),
            ),
            div(
                { class: "item-command"},
                span("ffmpeg -i {input} -crf {quality} {output}"),
            )
        ),
        div(
            { class: "list-item" },
            div(
                { class: "item-title"},
                span("gifを作成する"),
            ),
            div(
                { class: "item-description" },
                span("動画からgifを作成します。"),
            ),
            div(
                { class: "item-command"},
                span('ffmpeg -i {INPUT} -filter_complex "[0:v] fps={FPS},scale={WIDTH}:{HEIGHT=-1},split [a][b];[a] palettegen [p];[b][p] paletteuse" {OUTPUT}')
            )
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