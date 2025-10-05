import json
import psycopg2

conn = psycopg2.connect(
    dbname='velvetfusion',
    user='postgres',
    host='localhost',
    port='5432'
)

cur = conn.cursor()

with open("personaData.json", "r") as f:
    data = json.load(f)

for name, info in data.items():
    arcana = info.get("arcana")
    level = info.get('lvl')

    if arcana is not None and level is not None:
        cur.execute(
            "INSERT INTO personaDTO (name, arcana, level) VALUES (%s, %s, %s)",
            (name, arcana, level)
        )

conn.commit()
cur.close()
conn.close()
print("✅ Persona data imported successfully.")