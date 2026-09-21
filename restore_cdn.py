import glob
import re

files = glob.glob('*.html')

for fname in files:
    with open(fname, 'r', encoding='utf-8') as f:
        c = f.read()

    # Replace local stylesheet with CDN
    c = c.replace('<link rel="stylesheet" href="style.css">', '<script src="https://cdn.tailwindcss.com"></script>')

    # Add tailwind.config script block if missing
    config_script = """
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Poppins', 'sans-serif'],
                        serif: ['Cinzel', 'serif'],
                    },
                    colors: {
                        gold: {
                            50: '#fdfbf7',
                            100: '#fcf7e8',
                            400: '#e5c060',
                            500: '#D4AF37', /* Primary Gold */
                            600: '#bca02d',
                            700: '#967d22',
                        }
                    }
                }
            }
        }
    </script>"""

    if "tailwind.config =" not in c:
        # Insert before </head>
        c = c.replace('</head>', config_script + '\n</head>')

    with open(fname, 'w', encoding='utf-8') as f:
        f.write(c)
    
    print(f"Restored CDN in {fname}")
