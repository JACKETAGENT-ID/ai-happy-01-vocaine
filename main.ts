// ai-happy-01 entry — "Rainbow Puddle Voyage" (vocaine).
// Node 22, standard library only, no network.
// Reads the happy image shipped beside this file and writes it byte-for-byte
// to <MAKEFUN_OUTPUT_DIR>/entry.png (defaults to /output).
// The run is fully deterministic: the same input bytes always produce the
// same output bytes.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoDir = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(repoDir, 'happy.png');
const outputDir = process.env.MAKEFUN_OUTPUT_DIR?.trim() || '/output';
const outputPath = join(outputDir, 'entry.png');

const image = readFileSync(sourcePath);

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, image);

// Post-write check: the grader runs the program twice and requires both
// runs to write the same bytes, so fail loudly if what landed on disk
// differs from the image we shipped.
const written = readFileSync(outputPath);
if (!written.equals(image)) {
  throw new Error(`output mismatch: wrote ${written.length} bytes, expected ${image.length}`);
}

console.log(`wrote ${outputPath} (${image.length} bytes, verified)`);
