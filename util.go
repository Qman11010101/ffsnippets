package main

import (
	"bytes"
	"regexp"
)

func ParseCommand(command string) []string {
	re := regexp.MustCompile(`"[^"]*"|\S+`)
	matches := re.FindAllString(command, -1)

	for i, match := range matches {
		matches[i] = trimQuotes(match)
	}

	return matches
}

func trimQuotes(str string) string {
	if len(str) > 1 && str[0] == '"' && str[len(str)-1] == '"' {
		return str[1 : len(str)-1]
	}
	return str
}

// https://qiita.com/curious-eyes/items/2d4b6c20ea47e3efc47b
func CustomScan(data []byte, atEOF bool) (advance int, token []byte, err error) {
	if atEOF && len(data) == 0 {
		return 0, nil, nil
	}
	var i int
	if i = bytes.IndexByte(data, '\n'); i >= 0 {
		return i + 1, dropCR(data[0:i]), nil
	}
	if i = bytes.IndexByte(data, '\r'); i >= 0 {
		return i + 1, data[0:i], nil
	}
	if atEOF {
		return len(data), dropCR(data), nil
	}

	return 0, nil, nil
}

func dropCR(data []byte) []byte {
	if len(data) > 0 && data[len(data)-1] == '\r' {
		return data[0 : len(data)-1]
	}
	return data
}
