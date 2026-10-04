#!/usr/bin/env python3
"""Convert .org practice test files to JSON format."""

import re
import json
import glob
from pathlib import Path


def parse_org_file(filepath):
    """Parse an org file and extract questions, options, and answers."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    questions = []

    # Split content by question headers
    question_blocks = re.split(r'\*\* Question \d+:', content)[1:]

    for block in question_blocks:
        # Extract question text (first line)
        lines = block.strip().split('\n')
        q_text = lines[0].strip()

        # Extract answer from :ANSWER: property
        answer_match = re.search(r':ANSWER:\s*(.+)', block)
        answer = answer_match.group(1).strip() if answer_match else ''

        # Extract explanation from :EXPLANATION: property
        explanation_match = re.search(r':EXPLANATION:\s*(.+)', block)
        explanation = explanation_match.group(1).strip() if explanation_match else ''

        # Extract options (lines starting with - [ ] or - [X])
        option_pattern = r'- \[(.)\]\s*(.+)'
        option_matches = re.findall(option_pattern, block)

        options = []
        correct_index = -1

        for i, (marker, option_text) in enumerate(option_matches):
            opt = option_text.strip()
            options.append(opt)
            # Check if this option matches the answer or is marked with X
            if marker.upper() == 'X' or opt == answer:
                correct_index = i

        if options:  # Only add if we found options
            questions.append({
                'question': q_text,
                'options': options,
                'correctIndex': correct_index,
                'explanation': explanation
            })

    return questions


def main():
    """Convert all org files to a single JSON file."""
    org_files = sorted(glob.glob('practice-tests/aif-c01-practice-*.org'))

    all_questions = []

    for filepath in org_files:
        print(f"Processing: {filepath}")
        questions = parse_org_file(filepath)
        print(f"  Found {len(questions)} questions")

        # Add source file info
        filename = Path(filepath).stem
        for q in questions:
            q['id'] = len(all_questions) + 1
            q['source'] = filename
            all_questions.append(q)

    output = {
        'title': 'AWS Certified AI Practitioner (AIF-C01) Practice Test',
        'totalQuestions': len(all_questions),
        'questions': all_questions
    }

    with open('questions.json', 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    print(f"\nTotal: Converted {len(all_questions)} questions to questions.json")


if __name__ == '__main__':
    main()
