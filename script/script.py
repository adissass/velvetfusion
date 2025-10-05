import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse, unquote
import time

BASE_URL = "https://megamitensei.fandom.com"
CATEGORY_URL = BASE_URL + "/wiki/Category:Persona_5_Personas"
HEADERS = {
    "User-Agent": "VelvetFusionBot/0.2"
}



# === Utilities ===

def get_page(url):
    print(f"[🌐] Fetching: {url}")
    r = requests.get(url, headers=HEADERS)
    r.raise_for_status()
    return BeautifulSoup(r.text, "lxml")

def extract_filename_from_url(url):
    path = urlparse(url).path
    parts = path.split("/")
    for part in reversed(parts):
        if part.lower().endswith((".png", ".jpg", ".jpeg", ".webp", ".gif")):
            return unquote(part)
    return "image.png"

def download_image(url, filename, folder="images"):
    os.makedirs(folder, exist_ok=True)
    filepath = os.path.join(folder, filename)

    print(f"[⬇️ ] Downloading: {filename}")
    resp = requests.get(url, headers=HEADERS)
    if resp.status_code == 200:
        with open(filepath, "wb") as f:
            f.write(resp.content)
        print(f"[✅] Saved: {filepath}")
    else:
        print(f"[❌] Failed to download {filename}. Status code: {resp.status_code}")

# === Core Scraper ===

def get_persona_links(limit=None):
    links = []
    current_url = CATEGORY_URL

    while current_url:
        soup = get_page(current_url)
        for a in soup.select("a.category-page__member-link"):
            href = a.get("href")
            if href and href.startswith("/wiki/"):
                links.append((a.text.strip(), BASE_URL + href))
                if limit and len(links) >= limit:
                    return links

        # Check for next page
        next_link = soup.find("a", class_="category-page__pagination-next")
        if next_link:
            next_href = next_link.get("href")
            current_url = urljoin(BASE_URL, next_href)
            time.sleep(0.5)  # avoid hammering the server
        else:
            current_url = None

    return links

def process_persona(name, url, downloaded_log, missing_log):
    print(f"\n[🔁] Processing: {name}")
    try:
        soup = get_page(url)
    except Exception as e:
        print(f"[❌] Error loading page for {name}: {e}")
        missing_log.write(f"{name}\n")
        return

    found = False
    for link in soup.select("a.image.image-thumbnail"):
        title = (link.get("title") or "").lower()
        img = link.find("img")
        src = img.get("src") if img else ""
        # href = link.get("href") or ""

        if "p5x" in title or "p5x" in src.lower():
            # filename = extract_filename_from_url(href)
            # download_image(href, filename)
            downloaded_log.write(f"{name}\n")
            found = True
            break

    if not found:
        print(f"[❌] No P5X image found for: {name}")
        missing_log.write(f"{name}\n")

# === Main Runner ===

def main():
    persona_links = get_persona_links(limit=None)  # Set limit=5 to test

    with open("p5x_downloaded.txt", "a", encoding="utf-8") as downloaded_log, \
         open("p5x_missing.txt", "a", encoding="utf-8") as missing_log:

        for name, url in persona_links:
            process_persona(name, url, downloaded_log, missing_log)

if __name__ == "__main__":
    main()