import json
import sys
import glob

map_files = glob.glob('.next/**/*.map', recursive=True)
for file in map_files:
    try:
        with open(file, 'r') as f:
            data = json.load(f)
            if 'sources' in data and 'sourcesContent' in data:
                for idx, source in enumerate(data['sources']):
                    if 'page.tsx' in source and 'src/app/page.tsx' in source:
                        content = data['sourcesContent'][idx]
                        if "Архитектор" in content or "use client" in content:
                            # Let's verify it has some chunk of the actual code
                            if len(content.split('\n')) > 500:
                                with open('src/app/page.tsx', 'w') as out:
                                    out.write(content)
                                print(f"Recovered {len(content.splitlines())} lines from {file}")
                                sys.exit(0)
    except Exception as e:
        pass
print("Not found")
