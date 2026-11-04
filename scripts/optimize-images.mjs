import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();

const targets = [
  "src/assets/achievements/1.png",
  "src/assets/projects/travello.png",
  "src/assets/projects/kitchen-vision.png",
  "src/assets/projects/gitlens.png",
  "src/assets/achievements/v1.png",
  "src/assets/projects/resume-builder.png",
];

async function convertToWebp(relativePath) {
  const inputPath = path.join(projectRoot, relativePath);
  const outputPath = inputPath.replace(/\.(png|jpg|jpeg)$/i, ".webp");

  await sharp(inputPath).webp({ quality: 72, effort: 5 }).toFile(outputPath);

  const [inputStat, outputStat] = await Promise.all([
    fs.stat(inputPath),
    fs.stat(outputPath),
  ]);

  const saved = inputStat.size - outputStat.size;
  const percent = ((saved / inputStat.size) * 100).toFixed(1);

  return {
    inputPath: relativePath,
    outputPath: outputPath.replace(`${projectRoot}/`, ""),
    inputSize: inputStat.size,
    outputSize: outputStat.size,
    saved,
    percent,
  };
}

async function main() {
  const results = [];

  for (const target of targets) {
    try {
      results.push(await convertToWebp(target));
    } catch (error) {
      console.error(`Failed to optimize ${target}:`, error.message);
    }
  }

  console.log("Optimized image report:");
  for (const r of results) {
    console.log(
      `${r.inputPath} -> ${r.outputPath} | ${r.inputSize} -> ${r.outputSize} bytes (saved ${r.percent}%)`,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
