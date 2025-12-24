import json

try:
    with open('models.json', 'r', encoding='utf-16') as f:
        data = json.load(f)
        if 'models' in data:
            print("Available Models:")
            for m in data['models']:
                print(m['name'])
        else:
            print("No 'models' key in JSON")
except Exception as e:
    print(f"Error reading JSON: {e}")
    # Try utf-8 if utf-16 fails
    try:
        with open('models.json', 'r', encoding='utf-8') as f:
             data = json.load(f)
             if 'models' in data:
                print("Available Models:")
                for m in data['models']:
                    print(m['name'])
    except Exception as e2:
        print(f"Error reading JSON with utf-8: {e2}")
