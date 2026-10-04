# AWS Certified AI Practitioner (AIF-C01) Practice Test

A free, open-source practice test application for the AWS Certified AI Practitioner (AIF-C01) certification exam.

## 🚀 Try It Now

**[Start Practice Test](https://afsalmadathingal.github.io/aws-aif-c01-practice-test/)**

No installation required - practice directly in your browser!

## Features

- **100 Practice Questions** covering all exam domains
- **15 Multi-Select Questions** (Select 2) matching real exam format
- **Practice Mode** - See answers and explanations immediately
- **Exam Mode** - See results only at the end
- **Domain Filtering** - Focus on specific topics
- **Review Mode** - Review all answers after completing
- **Responsive Design** - Works on desktop and mobile
- **Keyboard Shortcuts** - Fast navigation with keyboard

## Exam Domains Covered

| Domain | Questions |
|--------|-----------|
| Fundamentals of AI and ML | 18 |
| Fundamentals of Generative AI | 18 |
| Applications of Foundation Models | 22 |
| Guidelines for Responsible AI | 14 |
| Security, Compliance, and Governance | 14 |
| AWS Managed AI Services | 14 |

## Quick Start

### Option 1: Run Locally

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/aws-aif-c01-practice-test.git
cd aws-aif-c01-practice-test

# Start a local server (Python 3)
python -m http.server 8000

# Open in browser
# http://localhost:8000
```

### Option 2: Use GitHub Pages (Recommended)

Visit: **https://afsalmadathingal.github.io/aws-aif-c01-practice-test/**

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `1-4` | Select option A-D |
| `←` | Previous question |
| `→` | Next question |
| `Enter` | Submit / Next |

## Topics Covered

### Domain 1: Fundamentals of AI and ML
- AI, ML, and Deep Learning concepts
- Supervised, Unsupervised, and Reinforcement Learning
- Data types (structured, unstructured, labeled, unlabeled)
- Batch vs Real-time inferencing
- Feature engineering and MLOps

### Domain 2: Fundamentals of Generative AI
- Tokens, embeddings, and transformers
- Foundation models and LLMs
- Amazon Bedrock, Amazon Q Business/Developer
- Multi-modal and diffusion models
- Temperature and top-p parameters

### Domain 3: Applications of Foundation Models
- Prompt engineering techniques (zero-shot, few-shot, chain-of-thought)
- RAG (Retrieval Augmented Generation)
- Fine-tuning and model customization
- Evaluation metrics (ROUGE, BLEU, BERTScore)
- Model selection considerations

### Domain 4: Guidelines for Responsible AI
- Bias, fairness, and inclusivity
- Transparency and explainability
- Guardrails for Amazon Bedrock
- Legal risks and hallucinations
- Human-in-the-loop practices

### Domain 5: Security, Compliance, and Governance
- AWS IAM, KMS, Macie, CloudTrail
- Shared Responsibility Model
- Data lineage and cataloging
- SageMaker Model Cards
- Input validation and output filtering

### AWS Managed AI Services
- Amazon Comprehend, Lex, Polly, Transcribe, Translate
- Amazon Rekognition, Textract, Kendra
- Amazon Forecast, Personalize
- Amazon SageMaker

## Project Structure

```
├── index.html           # Main application
├── questions.json       # Question bank (100 questions)
├── convert_org_to_json.py  # Conversion script
├── practice-tests/      # Original .org files
└── study-materials/     # Reference materials
```

## Contributing

Contributions are welcome! Feel free to:
- Add more questions
- Fix errors in existing questions
- Improve the UI
- Add new features

## Disclaimer

This is an unofficial practice test created for educational purposes. It is not affiliated with or endorsed by Amazon Web Services (AWS). The questions are based on publicly available study materials and the official exam guide.

For official exam information, visit: [AWS Certified AI Practitioner](https://aws.amazon.com/certification/certified-ai-practitioner/)

## License

MIT License - Feel free to use, modify, and distribute.

## Acknowledgments

- Question content based on [AWS AIF-C01 Study Guide](https://github.com/CloudCityPress/aws-aif-c01)
- Practice tests from [jwalsh/aif-c01](https://github.com/jwalsh/aif-c01)
