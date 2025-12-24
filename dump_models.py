import json

try:
    with open('models.json', 'r', encoding='utf-16') as f:
        data = json.load(f)
except Exception:
    try:
        with open('models.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
    except Exception as e:
        print(f"FAILED: {e}")
        exit(1)

if 'models' in data:
    with open('available_models.txt', 'w', encoding='utf-8') as f:
        for m in data['models']:
            name = m.get('name', 'UNKNOWN')
            methods = m.get('supportedGenerationMethods', [])
            f.write(f"{name} | Supported: {methods}\n")
    print("DONE")
else:
    print("No models key")
