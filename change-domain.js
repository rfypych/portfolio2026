import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
if (args.length !== 2) {
  console.error('\n❌ Error: Invalid arguments');
  console.error('Usage: npm run change-domain <old-domain> <new-domain>');
  console.error('   or: npm run set-domain <old-domain> <new-domain>');
  console.error('Example: npm run change-domain rfiklz.vercel.app rofikul.my.id\n');
  process.exit(1);
}

const oldDomain = args[0];
const newDomain = args[1];

const filesToUpdate = [
  'index.html',
  'vite.config.ts',
  'public/robots.txt',
  'public/sitemap.xml',
];

console.log(`\n🔄 Changing domain from "${oldDomain}" to "${newDomain}"...\n`);

let changedFilesCount = 0;

filesToUpdate.forEach((file) => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Create a global regex to replace the old domain
    // Escape dots in the old domain to safely use in regex
    const regex = new RegExp(oldDomain.replace(/\./g, '\\.'), 'g');
    
    if (regex.test(content)) {
      content = content.replace(regex, newDomain);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated: ${file}`);
      changedFilesCount++;
    } else {
      console.log(`➖ Skipped: ${file} (Domain not found)`);
    }
  } else {
    console.log(`⚠️ Not found: ${file}`);
  }
});

if (changedFilesCount > 0) {
  console.log(`\n🎉 Successfully changed domain in ${changedFilesCount} files!`);
  console.log('Jangan lupa commit perubahan ini ke GitHub: git add . && git commit -m "chore: change domain"');
} else {
  console.log(`\n🤷 Tidak ada file yang diubah. Pastikan "${oldDomain}" adalah domain yang saat ini terpasang.`);
}
