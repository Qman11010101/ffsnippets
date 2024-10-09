export const commandsData = [
    {
        title: "動画を圧縮する(crf)",
        description: "crf引数を指定して動画を圧縮します。",
        command: "ffmpeg -i {input} -crf {quality} {output}",
        variables: {
            input: {
                type: "text",
                placeholder: "動画ファイル",
                default: ""
            },
            quality: {
                type: "number",
                placeholder: "品質",
                default: 18
            },
            output: {
                type: "text",
                placeholder: "出力ファイル",
                default: ""
            }
        }
    },
    {
        title: "gifを作成する",
        description: "動画からgifを作成します。",
        command: 'ffmpeg -i {INPUT} -filter_complex "[0:v] fps={FPS},scale={WIDTH}:{HEIGHT},split [a][b];[a] palettegen [p];[b][p] paletteuse" {OUTPUT}',
        variables: {
            INPUT: {
                type: "text",
                placeholder: "動画ファイル",
                default: ""
            },
            FPS: {
                type: "number",
                placeholder: "フレームレート",
                default: 10
            },
            WIDTH: {
                type: "number",
                placeholder: "幅",
                default: 320
            },
            HEIGHT: {
                type: "number",
                placeholder: "高さ",
                default: 240
            },
            OUTPUT: {
                type: "text",
                placeholder: "出力ファイル",
                default: ""
            }
        }
    },
    {
        title: "動画を切り取る(時間)",
        description: "動画を指定時間で切り取ります。",
        command: "ffmpeg -i {INPUT} -ss {START} -to {END} {OUTPUT}",
        variables: {
            INPUT: {
                type: "text",
                placeholder: "動画ファイル",
                default: ""
            },
            START: {
                type: "text",
                placeholder: "開始時間",
                default: "00:00:00"
            },
            END: {
                type: "text",
                placeholder: "終了時間",
                default: "00:00:00"
            },
            OUTPUT: {
                type: "text",
                placeholder: "出力ファイル",
                default: ""
            }
        }
    },
    {
        title: "動画を切り取る(エリア)",
        description: "座標指定により、動画の特定領域を切り取ります。",
        command: "ffmpeg -i {INPUT} -vf crop={WIDTH}:{HEIGHT}:{X_OFFSET}:{Y_OFFSET} {OUTPUT}",
        variables: {
            INPUT: {
                type: "text",
                placeholder: "動画ファイル",
                default: ""
            },
            WIDTH: {
                type: "number",
                placeholder: "幅",
                default: 320
            },
            HEIGHT: {
                type: "number",
                placeholder: "高さ",
                default: 240
            },
            X_OFFSET: {
                type: "number",
                placeholder: "X座標",
                default: 0
            },
            Y_OFFSET: {
                type: "number",
                placeholder: "Y座標",
                default: 0
            },
            OUTPUT: {
                type: "text",
                placeholder: "出力ファイル",
                default: ""
            }
        }
    },
]