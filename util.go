package main

import (
	"regexp"
)

func ParseCommand(command string) []string {
	re := regexp.MustCompile(`"[^"]*"|\S+`)
	matches := re.FindAllString(command, -1)

	// ダブルクォートを外す（必要なら）
	for i, match := range matches {
		matches[i] = trimQuotes(match)
	}

	return matches
}

// ダブルクォートをトリムするヘルパー関数
func trimQuotes(str string) string {
	if len(str) > 1 && str[0] == '"' && str[len(str)-1] == '"' {
		return str[1 : len(str)-1]
	}
	return str
}
