package main

import (
	"bufio"
	"context"
	"os"
	"os/exec"
	"syscall"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

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

	err := cmd.Wait()

	if err != nil {
		// コマンドがエラーで終了した場合
		if exitError, ok := err.(*exec.ExitError); ok {
			// 終了コードを取得
			if status, ok := exitError.Sys().(syscall.WaitStatus); ok {
				exitCode := status.ExitStatus()
				runtime.EventsEmit(a.ctx, "command-exit-code", exitCode)
			}
		} else {
			// その他のエラー
			runtime.EventsEmit(a.ctx, "command-exit-code", 2)
		}
	} else {
		// 正常終了の場合
		runtime.EventsEmit(a.ctx, "command-exit-code", 0)
	}
}
