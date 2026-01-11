import os
import json
import urllib.request
import time

# Create directory if not exists
BASE_DIR = "public/wilayah"
os.makedirs(BASE_DIR, exist_ok=True)

def download_file(url, path):
    try:
        with urllib.request.urlopen(url) as response:
            if response.status == 200:
                data = response.read()
                with open(path, "wb") as f:
                    f.write(data)
                return True
            else:
                print(f"❌ Failed to download {url}: Status code {response.status}")
                return False
    except Exception as e:
        print(f"❌ Error downloading {url}: {e}")
        return False

def download_provinces():
    print("Checking provinces...")
    path = f"{BASE_DIR}/provinces.json"
    
    if not os.path.exists(path):
        print("Downloading provinces...")
        if download_file("https://wilayah.id/api/provinces.json", path):
            print("✅ Provinces downloaded")
            with open(path, "r") as f:
                return json.load(f)
        else:
            print("❌ Failed to download provinces.")
            return None
    else:
        print("✅ Provinces already exist")
        with open(path, "r") as f:
            return json.load(f)

def download_regencies(provinces_data):
    print("\nDownloading regencies (Cities/Kabupaten)...")
    if not provinces_data or 'data' not in provinces_data:
        print("Invalid province data")
        return

    count = 0
    total = len(provinces_data['data'])
    
    for prov in provinces_data['data']:
        code = prov['code']
        name = prov['name']
        path = f"{BASE_DIR}/regencies-{code}.json"
        
        if not os.path.exists(path):
            print(f"[{count+1}/{total}] Downloading regencies for {name} ({code})...")
            if download_file(f"https://wilayah.id/api/regencies/{code}.json", path):
                time.sleep(0.5) # Be nice to the API
            else:
                print(f"❌ Failed to download {name}")
        else:
            print(f"[{count+1}/{total}] ✅ {name} already exists")
        
        count += 1
    
    print("\n✨ All Regencies downloaded!")

def download_districts():
    print("\nDownloading districts (Kecamatan)...")
    # Find all regency files
    regency_files = [f for f in os.listdir(BASE_DIR) if f.startswith('regencies-') and f.endswith('.json')]
    
    total_regencies = len(regency_files)
    current_regency = 0
    
    for r_file in regency_files:
        current_regency += 1
        r_path = os.path.join(BASE_DIR, r_file)
        
        with open(r_path, 'r') as f:
            regencies = json.load(f)
            
        if not regencies or 'data' not in regencies:
            continue
            
        r_data = regencies['data']
        count = 0
        total = len(r_data)
        
        print(f"[{current_regency}/{total_regencies}] Processing {r_file} ({total} cities)...")
        
        for regency in r_data:
            code = regency['code']
            name = regency['name']
            path = f"{BASE_DIR}/districts-{code}.json"
            
            if not os.path.exists(path):
                # print(f"  Downloading {name} ({code})...")
                if download_file(f"https://wilayah.id/api/districts/{code}.json", path):
                    time.sleep(0.2) # Be nice to the API
                else:
                    print(f"  ❌ Failed to download {name}")
            
            count += 1

    print("\n✨ All Districts downloaded!")

if __name__ == "__main__":
    print("Starting Wilayah Downloader...")
    data = download_provinces()
    download_regencies(data)
    download_districts()
