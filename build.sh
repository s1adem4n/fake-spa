# create build if not exists
mkdir -p build

# build using babel
bun babel script.js --out-file build/script.js

# minify with uglify
bun uglifyjs --compress --mangle --toplevel --output comments=false,beautify=false -o build/script.min.js build/script.js

du -sh build/script.js
du -sh build/script.min.js

gzip -c build/script.js >build/script.js.gz
du -sh build/script.js.gz
gzip -c build/script.min.js >build/script.min.js.gz
du -sh build/script.min.js.gz
