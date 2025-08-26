"""
Lightweight extractive summarizer and keyword extractor using NLTK.
This avoids heavy transformer models while producing reliable
extractive summaries for short-medium sized PDFs.
"""

import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize
from collections import defaultdict
import math
import re

# Ensure required NLTK data present; callers can also download at app start.
try:
    nltk.data.find('tokenizers/punkt')
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('punkt')
    nltk.download('stopwords')

STOP = set(stopwords.words('english'))

def clean_text(text):
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def extract_keywords(text, top_n=6):
    text = clean_text(text).lower()
    words = [w for w in word_tokenize(text) if w.isalpha() and w not in STOP]
    freq = defaultdict(int)
    for w in words:
        freq[w] += 1
    # normalize frequencies
    if not freq:
        return []
    maxf = max(freq.values())
    for k in freq:
        freq[k] = freq[k] / maxf
    # score words and pick top_n
    sorted_words = sorted(freq.items(), key=lambda x: x[1], reverse=True)
    keywords = [w for w, _ in sorted_words[:top_n]]
    return keywords

def summarize_text(text, num_sentences=3):
    text = clean_text(text)
    if not text:
        return ''
    sentences = sent_tokenize(text)
    if len(sentences) <= num_sentences:
        return ' '.join(sentences)
    # build word frequency
    words = [w.lower() for w in word_tokenize(text) if w.isalpha() and w.lower() not in STOP]
    freq = defaultdict(int)
    for w in words:
        freq[w] += 1
    # score sentences
    sscore = {}
    for i, s in enumerate(sentences):
        s_words = [w.lower() for w in word_tokenize(s) if w.isalpha()]
        if not s_words:
            sscore[i] = 0
            continue
        score = sum(freq.get(w, 0) for w in s_words)
        sscore[i] = score / len(s_words)
    # pick top N sentence indices and preserve order
    top_idxs = sorted(sscore.items(), key=lambda x: x[1], reverse=True)[:num_sentences]
    top_idxs = sorted([i for i, _ in top_idxs])
    summary = ' '.join(sentences[i] for i in top_idxs)
    return summary
