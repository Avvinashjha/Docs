package main

import (
	"fmt"
	// "slices"
	// "sort"
)

func main() {
	// arr := [14]int{1, 2, 3, 4, 5, 10, 122, 32, 13, 17, 19, 23, 42, 2}
	arr := [10]int{0, 0, 1, 1, 1, 2, 2, 3, 3, 4}
	// res := findAllPrimeNumber(arr[:])
	// res := removeDuplicateFromSortedArray(color[:])
	// fmt.Println(color)
	// matrix := [][]int{
	// 	{1, 0, 1}, {0, 1, 1}, {1, 1, 1},
	// }
	// fmt.Println(matrix)
	// setMatrixZero(matrix)
	// fmt.Println(matrix)
	fmt.Println(arr)
	moveZeros(arr[:])
	fmt.Println(arr)
}

func findAllPrimeNumber(arr []int) []int {
	primes := []int{}

	for _, val := range arr {
		if val < 2 {
			continue
		}
		isPrime := true

		for i := 2; i*i <= val; i++ {
			if val%i == 0 {
				isPrime = false
				break
			}
		}
		if isPrime {
			primes = append(primes, val)
		}
	}
	return primes
}

func bubbleSort(arr []int) []int {
	n := len(arr)
	for i := 0; i < n-1; i++ {
		swapped := false
		for j := 0; j < n-i-1; j++ {
			if arr[j] > arr[j+1] {
				arr[j], arr[j+1] = arr[j+1], arr[j]
				swapped = true
			}
		}
		if !swapped {
			break
		}
	}
	return arr
}

func selectionSort(arr []int) []int {
	n := len(arr)
	for i := 0; i < n-1; i++ {
		minIndex := i
		for j := i + 1; j < n; j++ {
			if arr[j] < arr[minIndex] {
				minIndex = j
			}
		}
		arr[i], arr[minIndex] = arr[minIndex], arr[i]
	}
	return arr
}

func insertionSort(arr []int) []int {
	n := len(arr)
	for i := 0; i < n; i++ {
		key := arr[i]
		j := i - 1

		// shift larger element to right
		for j >= 0 && arr[j] > key {
			arr[j+1] = arr[j]
			j--
		}
		arr[j+1] = key
	}
	return arr
}

// func quickSort(){}

// func mergeSort(){}

// func binarySearch(){}

func findDuplicateNumber(nums []int) int {
	numMap := map[int]int{}
	for _, val := range nums {
		_, ok := numMap[val]
		if !ok {
			numMap[val] = 1
		} else {
			return val
		}
	}
	return 0
}

func sortColor(nums []int) {
	n := len(nums)
	start := 0
	mid := 0
	end := n - 1

	for mid <= end {
		switch nums[mid] {
		case 0:
			nums[start], nums[mid] = nums[mid], nums[start]
			start++
			mid++
		case 1:
			mid++
		case 2:
			nums[mid], nums[end] = nums[end], nums[mid]
			end--
		}
	}
}

func majorityElement(nums []int) int {
	majorityElement := nums[0]
	count := 1

	for i := 1; i < len(nums); i++ {
		if majorityElement == nums[i] {
			count++
		} else {
			count--
			if count == 0 {
				majorityElement = nums[i]
				count++
			}
		}
	}
	return majorityElement
}

func removeDuplicateFromSortedArray(nums []int) int {
	lastUniqueIndex := 0
	lastUniqueNumber := nums[0]

	for i := 1; i < len(nums); i++ {
		if lastUniqueNumber != nums[i] {
			nums[lastUniqueIndex+1] = nums[i]
			lastUniqueIndex++
			lastUniqueNumber = nums[i]
		}
	}
	return lastUniqueIndex + 1
}

func setMatrixZero(matrix [][]int) {
	zeroCol := []int{}
	zeroRow := []int{}

	for i := 0; i < len(matrix); i++ {
		for j := 0; j < len(matrix[0]); j++ {
			if matrix[i][j] == 0 {
				zeroCol = append(zeroCol, j)
				zeroRow = append(zeroRow, i)
			}
		}
	}

	for i := 0; i < len(zeroCol); i++ {
		for j := 0; j < len(matrix); j++ {
			matrix[j][i] = 0
		}
	}

	for i := 0; i < len(zeroRow); i++ {
		for j := 0; j < len(matrix[0]); j++ {
			matrix[i][j] = 0
		}
	}
}

func moveZeros(nums []int) {
	pointer := -1

	for i := range nums {
		if pointer >= 0 && nums[i] != 0 {
			nums[pointer] = nums[i]
			nums[i] = 0
			pointer++
		} else if nums[i] == 0 && pointer < 0 {
			pointer = i
		}
	}
}

// func bestTimeToBuySellStock(){}

// func chocolateDistributionProblem(){}

// func twoSum(){}

// func bestTimeToBuySellStock2(){}

// func mergeSortedArray(){}

// func subArraySumEqualsToK(){}

// func subArraySumDivisibleByK(){}

// func findAllDuplicates(){}

// func containerWithMostWater(){}

// func threeSum(){}

// func threeSumClosest(){}

// func fourSum(){}

// func maximumPointObtainedFromCards(){}

// func spiralMatrix(){}

// func wordSearch(){}

// func jumpGame(){}

// func printAllCombination(){}

// func gameOfLife(){}

// func reversePairs(){}

// func maxValueOfEquation(){}

// func insertDeleteGetRandom(){}

// func longestRectangleInHistogram(){}
