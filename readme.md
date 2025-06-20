# TSLABigDataStockPricesAnalytics

Full-stack aplikacja internetowa do analizy historycznych cen akcji Tesli z wykorzystaniem Java (Spring Boot), React.js, Dockera i Plotly.

## Założenia projektu

Celem projektu jest zbudowanie pełnej aplikacji webowej umożliwiającej analizę historycznych danych giełdowych spółki Tesla (TSLA)

Dane historyczne (np. Open, High, Low, Close, Volume) są pobierane z pliku CSV który jest pobierany z publicznego API

Projekt umożliwia wizualną analizę danych w celu:

- Wykrycia trendów i sezonowości
- Analizy zmienności oraz korelacji między zmiennymi
- Testowania prostych strategii inwestycyjnych (np. kupno gdy cena > SMA)

Rozwiązanie ma charakter edukacyjny i analityczny – nie służy do rzeczywistego handlu

Zakłada się, że dane wejściowe są generalnie poprawne, ale dodatkowo są czyszczone w celu uniknięcia błędów analitycznych

Dane są przechowywane w bazie PostgreSQL

## Funkcje

- Pobieranie danych historycznych Tesli (CSV/Data API)
- Normalizacja, przygotowanie danych do analizy
  - Mimo że dane są względnie czyste, zostały dodatkowo oczyszczone z potencjalnych braków lub pustych wartości, aby zapobiec nieoczekiwanym błędom podczas analizy
  - Zapis przetworzonych danych do bazy danych PostgreSQL
- Przetwarzanie i analiza:
  - Średnie kroczące (SMA)
  - Zmienność
  - Wzorce sezonowe
  - Korelacja wolumenu i ceny
  - Wizualizacja: Plotly (linie, słupki, świece)
- Prosty backtesting strategii kupna

## Technologie

### Backend:

- Java 17
- Spring Boot
- Maven
- REST API

### Frontend:

- React.js
- Plotly.js (przez react-plotly.js)

### Inne:

- Docker / docker-compose
- NGINX reverse proxy

## Struktura projektu

```
TSLABigDataStockPricesAnalytics/
├── frontend/              # Aplikacja React (SPA)
├── src/                   # Backend w Spring Boot (Java)
├── nginx/                 # Konfiguracja nginx
├── docker-compose.yaml   # Orkiestracja Docker
├── .env                  # Klucze API / zmienne środowiskowe
└── pom.xml               # Konfiguracja Mavena
```

## Uruchomiona wersja demo

Aplikacja została uruchomiona na VPS od Oracle Cloud i jest dostępna pod adresem: [http://130.61.153.123](http://130.61.153.123)

Można tam przetestować wszystkie funkcje aplikacji bez konieczności lokalnej instalacji.

## Uruchamianie lokalne przez Docker

Aby uruchomić projekt lokalnie przy użyciu Dockera:

1. Upewnij się, że masz zainstalowane Docker oraz Docker Compose.
2. W głównym katalogu projektu uruchom:

```bash
docker-compose up -d --build
```

3. Aplikacja frontendowa będzie dostępna na `http://localhost`

## Autor

[DKi214](https://github.com/DKi214)

