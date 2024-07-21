`{req|reqIs|reqNot|reqIsNot|is|isNot?}{subject!}{action?}`

## Part 1 (optional)
`req`      - Required [asserts that the subject is {subject} and returns the subject]
`reqNot`   - Required not [asserts that the subject is not {subject} and returns the subject]
`reqIs`    - Required is [asserts that the subject is {subject}]
`reqIsNot` - Required is not [asserts that the subject is not {subject}]
`is`       - Is [checks if the value is {subject} and returns a boolean]
`isNot`    - Is not [checks if the value is not {subject} and returns a boolean]

## Part 2
`{subject}` - The subject of the assertion [array, string, object, etc.]

## Part 3
`{action}`  - The action of the assertion [empty, valid, invalid]
