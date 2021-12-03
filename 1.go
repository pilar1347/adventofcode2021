package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

func main() {
	content, err := ioutil.ReadFile("1.txt")

	if err != nil {
		// these are annoying
		// i have no idea what I'm doing
		panic(err)
	}

	input := strings.Split(string(content), "\n")
	prev, err := strconv.Atoi(input[0])
	inc := 0

	for i := 1; i < len(input); i++ {
		curr, err := strconv.Atoi(input[i])
		if err != nil {
			panic(err)
		}
		if curr > prev {
			inc += 1
		}
		prev = curr
	}

	fmt.Println(inc)
}