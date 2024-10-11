package main

import (
	"bufio"
	"bytes"
	"context"
	"os"
	"os/exec"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

func CustomScan(data []byte, atEOF bool) (advance int, token []byte, err error) {
	if atEOF && len(data) == 0 {
		return 0, nil, nil
	}
	var i int
	if i = bytes.IndexByte(data, '\n'); i >= 0 {
		// We have a full newline-terminated line.
		return i + 1, dropCR(data[0:i]), nil
	}
	if i = bytes.IndexByte(data, '\r'); i >= 0 {
		// ここを追加した。（CR があったら、そこまでのデータを返そう）
		return i + 1, data[0:i], nil
	}
	// If we're at EOF, we have a final, non-terminated line. Return it.
	if atEOF {
		return len(data), dropCR(data), nil
	}
	// Request more data.
	return 0, nil, nil
}

// dropCR drops a terminal \r from the data.
func dropCR(data []byte) []byte {
	if len(data) > 0 && data[len(data)-1] == '\r' {
		return data[0 : len(data)-1]
	}
	return data
}

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) LoadCommandsDataString() string {
	pwd, err := os.Getwd()
	if err != nil {
		return ""
	}
	// Load the commands data json
	bytes, err := os.ReadFile(pwd + "/commands.json")
	if err != nil {
		return ""
	}
	return string(bytes)
}

func (a *App) GetFilePath() string {
	filepath, err := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{})
	if err != nil {
		return ""
	}
	return filepath
}

func (a *App) ExecuteCommand(command string) {
	commandArray := ParseCommand(command)
	cmd := exec.Command(commandArray[0], commandArray[1:]...)

	stdout, _ := cmd.StdoutPipe()
	stderr, _ := cmd.StderrPipe()

	cmd.Start()

	// 標準出力の読み込み
	go func() {
		scanner := bufio.NewScanner(stdout)
		for scanner.Scan() {
			// フロントエンドに送信
			runtime.EventsEmit(a.ctx, "command-output-out", scanner.Text())
		}
	}()

	// 標準エラーの読み込み
	go func() {
		scanner := bufio.NewScanner(stderr)
		scanner.Split(CustomScan)
		for scanner.Scan() {
			// フロントエンドに送信
			runtime.EventsEmit(a.ctx, "command-output-err", scanner.Text())
		}
	}()

	cmd.Wait()
}
