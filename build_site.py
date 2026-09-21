import glob
import re
import os

def build():
    # Load components
    try:
        with open('components/header.html', 'r', encoding='utf-8') as f:
            header_content = f.read()
        with open('components/footer.html', 'r', encoding='utf-8') as f:
            footer_content = f.read()
    except FileNotFoundError:
        print("Error: Could not find components/header.html or components/footer.html")
        return

    # Process all HTML files
    files = glob.glob('*.html')
    for fname in files:
        with open(fname, 'r', encoding='utf-8') as f:
            c = f.read()

        # Dynamic Active Link Highlighting in Header
        # Find the link that matches the current filename and add 'text-gold-500' to it
        active_header = header_content
        # Regex to match href="fname" class="something" and append text-gold-500 to class
        pattern = r'(href="' + re.escape(fname) + r'"\s+class="[^"]*)'
        active_header = re.sub(pattern, r'\1 text-gold-500', active_header)

        # Replace header
        c = re.sub(r'(<header.*?</header>)', active_header.replace('\\', '\\\\'), c, flags=re.DOTALL)
        
        # Replace footer
        c = re.sub(r'(<footer.*?</footer>)', footer_content.replace('\\', '\\\\'), c, flags=re.DOTALL)

        with open(fname, 'w', encoding='utf-8') as f:
            f.write(c)
        print(f"Updated {fname}")

if __name__ == "__main__":
    print("Building site components...")
    build()
    print("Build complete!")
