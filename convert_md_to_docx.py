import os
import re
import base64
import pypandoc
import requests

def convert_mermaid_to_image(mermaid_code):
    """Encodes mermaid code and fetches it as a PNG from mermaid.ink"""
    encoded_str = base64.b64encode(mermaid_code.encode('utf-8')).decode('utf-8')
    url = f"https://mermaid.ink/img/{encoded_str}?type=png"
    return url

def process_markdown(md_text):
    """Finds mermaid blocks, generates images, and replaces the blocks with markdown image tags."""
    # Regex to find mermaid code blocks
    pattern = re.compile(r'```mermaid\s+(.*?)\s+```', re.DOTALL)
    
    def replacer(match):
        mermaid_code = match.group(1).strip()
        image_url = convert_mermaid_to_image(mermaid_code)
        # Return a markdown image link instead of the code block
        return f"![]({image_url})"
    
    new_md_text = pattern.sub(replacer, md_text)
    return new_md_text

def convert_file(input_filename, output_filename):
    print(f"Reading {input_filename}...")
    with open(input_filename, 'r', encoding='utf-8') as f:
        md_text = f.read()
    
    print(f"Processing mermaid blocks for {input_filename}...")
    processed_md = process_markdown(md_text)
    
    print(f"Converting to {output_filename} using pandoc...")
    # Convert markdown string to docx file
    pypandoc.convert_text(processed_md, 'docx', format='md', outputfile=output_filename)
    print(f"Successfully generated {output_filename}")

if __name__ == "__main__":
    files = [
        ("MediClaim-OS/Report_MediClaim.md", "MediClaim-OS/Report_MediClaim.docx"),
        ("CareGuard-Portal/Report_CareGuard.md", "CareGuard-Portal/Report_CareGuard.docx"),
        ("HealthSync-Network/Report_HealthSync.md", "HealthSync-Network/Report_HealthSync.docx")
    ]
    
    for in_f, out_f in files:
        if os.path.exists(in_f):
            convert_file(in_f, out_f)
        else:
            print(f"File not found: {in_f}")
