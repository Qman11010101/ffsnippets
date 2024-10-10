package main

import (
	"context"
	"os"

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
