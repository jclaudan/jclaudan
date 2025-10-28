import { readFileSync } from 'fs'

// Test the regex on a real file
const content = readFileSync('../docs/fr/README.md', 'utf8')
const mermaidRegex = /```mermaid\s*\n([\s\S]*?)\n\s*```/g

console.log('Testing regex on docs/fr/README.md...')
console.log('\nFirst 1000 chars of file:')
console.log(content.substring(0, 1000))

console.log('\n\nTrying regex matches...')
const matches = []
let match
let i = 0

while ((match = mermaidRegex.exec(content)) !== null && i < 5) {
  matches.push(match)
  i++
}

if (matches.length > 0) {
  console.log(`\n✅ Found ${matches.length} matches!`)
  matches.forEach((m, idx) => {
    console.log(`\nMatch ${idx + 1}:`)
    console.log('Full match length:', m[0].length)
    console.log('Code length:', m[1].length)
    console.log('First 100 chars of code:', m[1].substring(0, 100))
  })
} else {
  console.log('\n❌ No matches found')
  
  // Try alternative patterns
  console.log('\nTrying alternative patterns...')
  
  const alt1 = /`{3}mermaid/g
  const count1 = (content.match(alt1) || []).length
  console.log(`Pattern backtick x3 + mermaid found: ${count1} occurrences`)
  
  const alt2 = /`{3}mermaid\n/g
  const count2 = (content.match(alt2) || []).length
  console.log(`Pattern backtick x3 + mermaid + newline found: ${count2} occurrences`)
}
