const fs = require('fs');

try {
  let content = fs.readFileSync('src/app/page.tsx', 'utf-8');

  const startStr = '            {/* HISTORICAL TRACK RECORD (Moved Down) */}';
  const startIndex = content.indexOf(startStr);

  if(startIndex === -1) {
      console.log("Could not find start str!");
      process.exit(1);
  }

  let endIndex = content.indexOf('</section>', startIndex);

  if(endIndex === -1) {
      console.log("Could not find end index");
      process.exit(1);
  }

  endIndex = endIndex + 10; // includes '</section>'

  let block = content.substring(startIndex, endIndex);
  
  // Remove block from its current location
  content = content.substring(0, startIndex) + content.substring(endIndex);

  // Modify block texts and components
  block = block.replace('с 2021 года', 'с 2016 года');
  block = block.replace('<HorizontalScroll className="z-20 mt-10">', '<div className="relative w-full overflow-x-auto pb-8 z-20 snap-x snap-mandatory pt-4 px-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">');
  block = block.replace('<div className="flex gap-4 px-[20px] items-center h-full w-max mx-auto py-10">', '<div className="flex gap-4 w-max shrink-0">');
  block = block.replace(/className=\"w-\\[300px\\]/g, 'className=\"snap-center shrink-0 w-[300px]');
  block = block.replace('</HorizontalScroll>', '</div>');
  
  // Also adjust the container margins if needed
  block = block.replace('mt-16 border-t border-gray-100/10', 'mt-12 mb-12 border-t border-gray-100/10 pt-12');

  // Insert before </main>
  const injectStr = '        </main>';
  const injectIndex = content.indexOf(injectStr);
  
  if(injectIndex === -1) {
    console.log('Injection string not found');
    process.exit(1);
  }

  content = content.substring(0, injectIndex) + block + '\n\n' + content.substring(injectIndex);

  fs.writeFileSync('src/app/page.tsx', content, 'utf-8');
  console.log('Successfully moved and modified Track Record.');
} catch (e) {
  console.error(e);
}
