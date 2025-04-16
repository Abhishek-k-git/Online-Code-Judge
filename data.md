#### Dummy json data

```js
"problem": {
   "endpoint": "http://localhost:3000/problems",
   "method": "POST",
   "payload": {
      "title": "Find the Factorial!",
      "description": "Given a non-negative integer n, return the factorial of n. Factorial is the product of all positive integers less than or equal to n. For example, factorial of 5 is 5! = 5 * 4 * 3 * 2 * 1 = 120.",
      "difficulty": "easy",
      "testCases": [
         {
            "input": "5",
            "output": "120"
         },
         {
            "input": "0",
            "output": "1"
         },
         {
            "input": "3",
            "output": "6"
         }
      ],
      "codeStubs": [
         {
            "language": "PYTHON",
            "startSnippet": "",
            "endSnippet": "if __name__ == \"__main__\":\n\tn = int(input())\n\tsolution = Solution()\n\tresult = solution.factorial(n)\n\tprint(result)",
            "userSnippet": "class Solution:\n\tdef factorial(self, n):\n\t\t# your code here\n\t\tpass  # Replace with actual logic"
         },
         {
            "language": "JAVA",
            "startSnippet": "import java.util.Scanner;",
            "endSnippet": "public class Main {\n\tpublic static void main(String[] args) {\n\t\tScanner scanner = new Scanner(System.in);\n\t\tint n = scanner.nextInt();\n\t\tSolution solution = new Solution();\n\t\tint result = solution.factorial(n);\n\t\tSystem.out.println(result);\n\t\tscanner.close();\n\t}\n}",
            "userSnippet": "class Solution {\n\tpublic int factorial(int n) {\n\t\t// your code here\n\t}\n}"
         },
         {
            "language": "CPP",
            "startSnippet": "#include <iostream>\nusing namespace std;",
            "endSnippet": "int main() {\n\tint n;\n\tcin >> n;\n\tSolution solution;\n\tint result = solution.factorial(n);\n\tcout << result << endl;\n\treturn 0;\n};",
            "userSnippet": "class Solution {\npublic:\n\tint factorial(int n) {\n\t\t// your code here\n\t}\n};"
         }
      ],
      "editorial": "The factorial can be calculated using a simple loop or recursion. For large inputs, be aware of potential integer overflow issues."
   }
},

"submission": {
   "endpoint": "http://localhost:4000/submission",
   "method": "POST",
   "payload": {
      "userId": "user123",
      "problemId": "problem123",
      "code": "class Solution:\n\tdef factorial(self, n):\n\t\tif n == 0 or n == 1:\n\t\t\treturn 1\n\t\treturn n * self.factorial(n - 1)",
      "language": "PYTHON"
   }
}
```

```js
"problem": {
   "endpoint": "http://localhost:3000/problems",
   "method": "POST",
   "payload": {
      "title": "Maximum Contiguous Subarray Sum!",
      "description": "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum. For example, for nums = [-2,1,-3,4,-1,2,1,-5,4], the contiguous subarray [4,-1,2,1] has the largest sum = 6.",
      "difficulty": "medium",
      "testCases": [
         {
            "input": "[-2,1,-3,4,-1,2,1,-5,4]",
            "output": "6"
         },
         {
            "input": "[1]",
            "output": "1"
         },
         {
            "input": "[-1,-2,-3,-4]",
            "output": "-1"
         }
      ],
      "codeStubs": [
         {
            "language": "PYTHON",
            "startSnippet": "",
            "endSnippet": "if __name__ == \"__main__\":\n\tnums = list(map(int, input().split()))\n\tsolution = Solution()\n\tresult = solution.maxSubArray(nums)\n\tprint(result)",
            "userSnippet": "class Solution:\n\tdef maxSubArray(self, nums):\n\t\t# your code here\n\t\tpass  # Replace with actual logic"
         },
         {
            "language": "JAVA",
            "startSnippet": "import java.util.*;",
            "endSnippet": "public class Main {\n\tpublic static void main(String[] args) {\n\t\tScanner scanner = new Scanner(System.in);\n\t\tString[] input = scanner.nextLine().split(\" \");\n\t\tint[] nums = Arrays.stream(input).mapToInt(Integer::parseInt).toArray();\n\t\tSolution solution = new Solution();\n\t\tint result = solution.maxSubArray(nums);\n\t\tSystem.out.println(result);\n\t\tscanner.close();\n\t}\n}",
            "userSnippet": "class Solution {\n\tpublic int maxSubArray(int[] nums) {\n\t\t// your code here\n\t}\n}"
         },
         {
            "language": "CPP",
            "startSnippet": "#include <iostream>\n#include <vector>\nusing namespace std;",
            "endSnippet": "int main() {\n\tint n;\n\tcin >> n;\n\tvector<int> nums(n);\n\tfor (int i = 0; i < n; i++) cin >> nums[i];\n\tSolution solution;\n\tint result = solution.maxSubArray(nums);\n\tcout << result << endl;\n\treturn 0;\n};",
            "userSnippet": "class Solution {\npublic:\n\tint maxSubArray(vector<int>& nums) {\n\t\t// your code here\n\t}\n};"
         }
      ],
      "editorial": "Use Kadane's Algorithm. Initialize max_so_far and current_max to the first element, then iterate through the array updating the current maximum and global maximum accordingly."
   }
},

"submission": {
   "endpoint": "http://localhost:4000/submission",
   "method": "POST",
   "payload": {
      "userId": "user123",
      "problemId": "problem456",
      "code": "class Solution:\n\tdef maxSubArray(self, nums):\n\t\tmax_sum = current_sum = nums[0]\n\t\tfor num in nums[1:]:\n\t\t\tcurrent_sum = max(num, current_sum + num)\n\t\t\tmax_sum = max(max_sum, current_sum)\n\t\treturn max_sum",
      "language": "PYTHON"
   }
}

```

#### Endpoints

###### Problems service

```shell
1. post - http//localhost/3000/problems
2. get - http//localhost/3000/problems
3. get - http//localhost/3000/problem/:problem_id
4. delete - http//localhost/3000/problems/:problem_id
5. patch - http//localhost/3000/problems/:problem_id
```

###### Submission service

```shell
1. post - http//localhost/4000/submission
2. get - http//localhost/4000/submission/:user_id
```
