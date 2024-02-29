mkdir -p build

bun babel src/script.js --out-file build/script.js

bun uglifyjs --compress --mangle --toplevel --output comments=false,beautify=false -o build/script.min.js build/script.js

SCRIPT=$(cat build/script.js)
MINIFIED=$(cat build/script.min.js)
echo "Original: ${#SCRIPT} bytes"
echo "Minified: ${#MINIFIED} bytes"
echo "Savings:  $((100 - 100 * ${#MINIFIED} / ${#SCRIPT}))%"
