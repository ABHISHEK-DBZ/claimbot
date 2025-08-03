import pypdf
import os
import re
from typing import List

def load_pdf(file_path: str) -> str:
    """Load and extract text from a PDF file."""
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"PDF file not found: {file_path}")
    
    print(f"Attempting to read PDF: {file_path}")
    text = ""
    try:
        with open(file_path, 'rb') as file:
            pdf_reader = pypdf.PdfReader(file)
            print(f"PDF has {len(pdf_reader.pages)} pages")
            for page_num, page in enumerate(pdf_reader.pages):
                try:
                    page_text = page.extract_text()
                    if page_text:
                        text += f"\n--- Page {page_num + 1} ---\n{page_text}\n"
                except Exception as e:
                    print(f"Error reading page {page_num + 1}: {e}")
                    continue
    except Exception as e:
        print(f"Error opening PDF file: {e}")
        raise
    
    return text

def split_text_into_chunks(text: str, chunk_size: int = 1000, chunk_overlap: int = 150) -> List[str]:
    """Split text into overlapping chunks."""
    # Clean up the text
    text = re.sub(r'\s+', ' ', text.strip())
    
    if len(text) <= chunk_size:
        return [text]
    
    chunks = []
    start = 0
    
    while start < len(text):
        # Find the end of this chunk
        end = start + chunk_size
        
        # If we're at the end of the text, take the rest
        if end >= len(text):
            chunks.append(text[start:])
            break
        
        # Try to break at a sentence boundary
        chunk_text = text[start:end]
        
        # Look for sentence endings near the end of the chunk
        sentence_endings = [m.end() for m in re.finditer(r'[.!?]\s+', chunk_text)]
        if sentence_endings:
            # Use the last sentence ending within the chunk
            last_sentence_end = sentence_endings[-1]
            end = start + last_sentence_end
        
        chunks.append(text[start:end])
        
        # Set the start of the next chunk with overlap
        start = end - chunk_overlap
        
        # Make sure we don't go backwards
        if start < 0:
            start = 0
    
    return chunks

# 1. Load the document
try:
    # Try different PDF file names in your project
    pdf_files = [
        "your_policy_document.pdf",
        "Medical Insurance Policy for Existing Employees(1).pdf",
        "90ade7e39d5e481f9aeb772a19a30234.pdf"
    ]
    
    pdf_file = None
    for file_name in pdf_files:
        if os.path.exists(file_name):
            pdf_file = file_name
            break
    
    if not pdf_file:
        print("No PDF files found. Available files:")
        for file in os.listdir("."):
            if file.endswith(".pdf"):
                print(f"  - {file}")
        raise FileNotFoundError("No suitable PDF file found")
    
    print(f"Loading PDF: {pdf_file}")
    document_text = load_pdf(pdf_file)
    print(f"Document text length after loading: {len(document_text)}")
    
    if not document_text.strip():
        print("Warning: No text extracted from PDF")
        raise ValueError("No text could be extracted from the PDF file")
    
    # 2. Chunk the document
    chunks = split_text_into_chunks(document_text, chunk_size=1000, chunk_overlap=150)
    
    # 3. Print the results
    print(f"Successfully loaded document from: {pdf_file}")
    print(f"Total document length: {len(document_text)} characters")
    print(f"Split the document into {len(chunks)} chunks.")
    
    if chunks:
        print(f"\n--- Sample Chunk (first {min(500, len(chunks[0]))} characters) ---")
        print(chunks[0][:500] + ("..." if len(chunks[0]) > 500 else ""))
        
        if len(chunks) > 1:
            print(f"\n--- Chunk sizes ---")
            for i, chunk in enumerate(chunks[:5]):  # Show first 5 chunk sizes
                print(f"Chunk {i+1}: {len(chunk)} characters")
            if len(chunks) > 5:
                print(f"... and {len(chunks) - 5} more chunks")

except Exception as e:
    print(f"Error processing PDF: {e}")
    print(f"Error type: {type(e).__name__}")
    import traceback
    print(f"Full traceback:\n{traceback.format_exc()}")
    print("\nMake sure you have a PDF file in the current directory.")

print("\n--- Execution completed ---")
input("Press Enter to exit...")