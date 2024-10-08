import van from "./van-1.5.2.min.js"
import { StandardOutput } from "../wailsjs/go/main/App"

const { div, input, span } = van.tags

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
                { class: "item-title" },
                span("動画を圧縮する(crf)"),
            ),
            div(
                { class: "item-description" },
                span("crf引数を指定して動画を圧縮します。"),
            ),
            div(
                { class: "item-command" },
                span("ffmpeg -i {input} -crf {quality} {output}"),
            )
        ),
        div(
            { class: "list-item" },
            div(
                { class: "item-title" },
                span("gifを作成する"),
            ),
            div(
                { class: "item-description" },
                span("動画からgifを作成します。"),
            ),
            div(
                { class: "item-command" },
                span('ffmpeg -i {INPUT} -filter_complex "[0:v] fps={FPS},scale={WIDTH}:{HEIGHT=-1},split [a][b];[a] palettegen [p];[b][p] paletteuse" {OUTPUT}')
            )
        ),
        div(
            { class: "list-item" },
            div(
                { class: "item-title" },
                span("動画を切り取る(時間)"),
            ),
            div(
                { class: "item-description" },
                span("動画を指定時間で切り取ります。"),
            ),
            div(
                { class: "item-command" },
                span("ffmpeg -i {INPUT} -ss {START} -to {END} {OUTPUT}"),
            )
        ),
        div(
            { class: "list-item" },
            div(
                { class: "item-title" },
                span("動画を切り取る(エリア)"),
            ),
            div(
                { class: "item-description" },
                span("座標指定により、動画の特定領域を切り取ります。"),
            ),
            div(
                { class: "item-command" },
                span("ffmpeg -i {INPUT} -vf crop={WIDTH}:{HEIGHT}:{X_OFFSET}:{Y_OFFSET} {OUTPUT}"),
            )
        ),
        div(
            { class: "list-item" },
            div(
                { class: "item-title" },
                span("音声をmp3に変換する"),
            ),
            div(
                { class: "item-description" },
                span("音声をmp3形式に変換します。"),
            ),
            div(
                { class: "item-command" },
                span("ffmpeg -i {INPUT} -vn -acodec libmp3lame {OUTPUT}"),
            )
        ),
        div(
            { class: "list-item" },
            div(
                { class: "item-title" },
                span("動画をリサイズする"),
            ),
            div(
                { class: "item-description" },
                span("動画の解像度を変更します。"),
            ),
            div(
                { class: "item-command" },
                span("ffmpeg -i {INPUT} -vf scale={WIDTH}:{HEIGHT} {OUTPUT}"),
            )
        ),
        div(
            { class: "list-item" },
            div(
                { class: "item-title" },
                span("動画を回転する"),
            ),
            div(
                { class: "item-description" },
                span("動画を指定角度で回転します。"),
            ),
            div(
                { class: "item-command" },
                span("ffmpeg -i {INPUT} -vf rotate={ANGLE} {OUTPUT}"),
            )
        ),
        div(
            { class: "list-item" },
            div(
                { class: "item-title" },
                span("動画を反転する"),
            ),
            div(
                { class: "item-description" },
                span("動画を反転します。"),
            ),
            div(
                { class: "item-command" },
                span("ffmpeg -i {INPUT} -vf hflip {OUTPUT}"),
            )
        ),
    )
}

document.addEventListener("DOMContentLoaded", async () => {
    await StandardOutput("Ready!").then(
        (result) => {
            console.log(result)
        }
    )
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