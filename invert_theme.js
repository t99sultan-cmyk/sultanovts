const fs = require('fs');

const p = "src/app/page.tsx";
let content = fs.readFileSync(p, 'utf8');

const split_marker = "{/* OFFER";
if (!content.includes(split_marker)) {
    console.error("Could not find split marker!");
    process.exit(1);
}

const parts = content.split(split_marker);
let part1 = parts[0];
let part2 = split_marker + parts[1];

const reps1 = [
    // General bg
    ['bg-[#0A0705]', 'bg-white'],
    ['bg-[#140E0B]', 'bg-gray-50'],
    ['bg-[#1C130F]', 'bg-white'],
    ['bg-[#050302]', 'bg-white'],
    ['bg-[#100C0A]', 'bg-gray-50'],
    ['bg-[#2E221D]', 'bg-gray-200'],
    
    // Text
    ['text-white', 'text-gray-900'],
    ['text-gray-300', 'text-gray-700'],
    ['text-gray-400', 'text-gray-600'],
    ['text-gray-200', 'text-gray-800'],
    
    // Borders
    ['border-[#2E221D]', 'border-gray-200'],
    ['border-gray-700', 'border-gray-300'],
    ['border-white/20', 'border-gray-300'],
    ['border-white/10', 'border-gray-200'],
    
    // Rule 1 (Orange)
    ['bg-[#1A0B05]', 'bg-orange-50'],
    ['from-[#2A1108]', 'from-white'],
    ['to-[#120603]', 'to-orange-50'],
    ['text-orange-50/80', 'text-gray-800'],
    ['bg-[#170C08]', 'bg-white'],
    ['border-orange-900/50', 'border-orange-200'],
    ['bg-orange-950/40', 'bg-orange-100/50'],
    
    // Rule 2 (Purple)
    ['bg-[#130A15]', 'bg-purple-50'],
    ['from-[#1C0F22]', 'from-white'],
    ['to-[#0D0512]', 'to-purple-50'],
    ['text-purple-50/80', 'text-gray-800'],
    ['bg-[#0F0712]', 'bg-white'],
    ['border-purple-900/50', 'border-purple-200'],
    ['bg-purple-950/40', 'bg-purple-100/50'],
    
    // Rule 3 (Blue)
    ['bg-[#09101E]', 'bg-blue-50'],
    ['from-[#0F172A]', 'from-white'],
    ['to-[#060B14]', 'to-blue-50'],
    ['text-blue-50/80', 'text-gray-800'],
    ['bg-[#060B14]', 'bg-white'],
    ['border-blue-900/50', 'border-blue-200'],
    ['bg-blue-950/40', 'bg-blue-100/50'],
    
    // Rule 4 (Emerald)
    ['bg-[#07130F]', 'bg-emerald-50'],
    ['from-[#0A1A14]', 'from-white'],
    ['to-[#040C0A]', 'to-emerald-50'],
    ['text-emerald-50/80', 'text-gray-800'],
    ['bg-[#050B08]', 'bg-white'],
    ['border-emerald-900/50', 'border-emerald-200'],
    ['bg-emerald-950/40', 'bg-emerald-100/50'],
    
    // Body and Main
    ['<body className="bg-[#050302] text-white">', '<body className="bg-[#F9FAFB] text-gray-900">'],
    ['<main className="text-white">', '<main className="text-gray-900">'],

    // Guarantee Fix
    ['bg-red-500/10', 'bg-red-100'],
    ['bg-red-500/20', 'bg-red-200'],
    ['border-red-500/30', 'border-red-500'],
    ['text-red-400', 'text-red-600'],

    // Logos
    ['bg-white/5', 'bg-black/5'],
    ['hover:bg-white/10', 'hover:bg-black/10'],
    ['hover:text-white', 'hover:text-black'],
    ['border-white/10', 'border-black/10']
];

for (const [oldVal, newVal] of reps1) {
    part1 = part1.split(oldVal).join(newVal);
}

const reps2 = [
    ['bg-gray-50', 'bg-[#05050A]'],
    ['text-gray-900', 'text-white'],
    ['text-black', 'text-white'],
    ['text-gray-700', 'text-gray-300'],
    ['text-gray-800', 'text-white'],
    ['text-gray-500', 'text-gray-400'],
    ['bg-white', 'bg-[#0F0F1A]'],
    ['border-gray-200', 'border-white/10'],
    ['border-gray-100', 'border-white/5'],
    ['bg-orange-50/50', 'bg-[#1A1005]'],
    ['border-orange-100', 'border-orange-500/30'],
    ['bg-blue-50/50', 'bg-[#05101A]'],
    ['border-blue-100', 'border-blue-500/30'],
    ['shadow-[0_-20px_50px_rgba(255,255,255,0.05)]', 'shadow-[0_-20px_50px_rgba(0,0,0,0.5)]']
];

for (const [oldVal, newVal] of reps2) {
    part2 = part2.split(oldVal).join(newVal);
}

fs.writeFileSync(p, part1 + part2, 'utf8');
console.log("Updated page.tsx");

// Form
const form_path = "src/components/MultiStepForm.tsx";
let form_content = fs.readFileSync(form_path, 'utf8');

const reps3 = [
    ['bg-white', 'bg-[#131320]'],
    ['text-gray-900', 'text-white'],
    ['text-black', 'text-white'],
    ['text-gray-800', 'text-gray-100'],
    ['text-gray-700', 'text-gray-300'],
    ['text-gray-600', 'text-gray-400'],
    ['text-gray-500', 'text-gray-400'],
    ['border-gray-200', 'border-white/10'],
    ['border-gray-300', 'border-white/20'],
    ['bg-gray-50', 'bg-[#0A0A15]'],
    ['hover:bg-gray-50', 'hover:bg-[#1A1A2A]'],
    ['from-green-50 to-emerald-100', 'from-emerald-900/40 to-green-900/40'],
    ['bg-green-100', 'bg-emerald-500/20'],
    ['text-green-600', 'text-emerald-400'],
    ['bg-gray-200', 'bg-gray-800'],
    ['bg-gray-100', 'bg-gray-800/50'],
    ['shadow-sm', 'shadow-[0_5px_15px_rgba(0,0,0,0.5)]']
];

for (const [oldVal, newVal] of reps3) {
    form_content = form_content.split(oldVal).join(newVal);
}

fs.writeFileSync(form_path, form_content, 'utf8');
console.log("Updated MultiStepForm.tsx");
