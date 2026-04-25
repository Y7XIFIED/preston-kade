const fs = require("fs");
const path = require("path");

const dist = path.join(process.cwd(), "dist", "assets");
const limitKb = 1100;

if (!fs.existsSync(dist)) {
  console.error("dist/assets not found. Run build first.");
  process.exit(1);
}

const files = fs.readdirSync(dist).filter((f) => f.endsWith(".js") || f.endsWith(".css"));
let failed = false;
for (const file of files) {
  const sizeKb = fs.statSync(path.join(dist, file)).size / 1024;
  if (sizeKb > limitKb) {
    console.error(`Budget exceeded: ${file} ${sizeKb.toFixed(1)}KB > ${limitKb}KB`);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log("Perf budget check passed.");
