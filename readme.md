# TSLABigDataStockPricesAnalytics

Full-stack aplikacja internetowa do analizy historycznych cen akcji Tesli z wykorzystaniem Java (Spring Boot), React.js, Dockera i Plotly.

## Funkcje

- Pobieranie danych historycznych Tesli (CSV/Data API)
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

Aplikacja jest dostępna pod adresem: [http://130.61.153.123](http://130.61.153.123)

Można tam przetestować wszystkie funkcje aplikacji bez konieczności lokalnej instalacji.

## Licencja

MIT

## Autor

[DKi214](https://github.com/DKi214)

