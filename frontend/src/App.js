import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

function movingAverage(arr, windowSize) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (i < windowSize - 1) {
            result.push(null);
        } else {
            const window = arr.slice(i - windowSize + 1, i + 1);
            const avg = window.reduce((a, b) => a + b, 0) / windowSize;
            result.push(avg);
        }
    }
    return result;
}

function App() {
    const [data, setData] = useState(null);
    const [selectedAnalysis, setSelectedAnalysis] = useState(1);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        axios.get('api/tesla-data')
            .then(response => setData(response.data))
            .catch(console.error);
    }, []);

    if (!data) return <div>Ładowanie...</div>;

    const dates = data.map(d => d.date);
    const closePrices = data.map(d => +d.close);
    const openPrices = data.map(d => +d.open);
    const highPrices = data.map(d => +d.high);
    const lowPrices = data.map(d => +d.low);
    const volumes = data.map(d => +d.volume);

    const descriptions = {
        1: 'Trend cenowy wraz z 50- i 200-dniową średnią kroczącą.',
        2: 'Wykres zmienności: różnica między najwyższą a najniższą ceną w danym dniu.',
        3: 'Objętość obrotu oraz 20-dniowa średnia krocząca wolumenu.',
        4: 'Korelacja między wolumenem obrotu a ceną zamknięcia.',
        5: 'Analiza sezonowa: średnie ceny zamknięcia w poszczególnych miesiącach.',
        6: 'Wykres świecowy (Open, High, Low, Close).',
        7: 'Backtesting prostej strategii: kupno, gdy cena jest powyżej 50-dniowej SMA.'
    };

    const xAxisDateConfig = {
        title: 'Data',
        tickformat: '%Y-%m-%d',
        rangeselector: {
            buttons: [
                { count: 1, label: '1m', step: 'month', stepmode: 'backward' },
                { count: 6, label: '6m', step: 'month', stepmode: 'backward' },
                { count: 1, label: '1y', step: 'year', stepmode: 'backward' },
                { step: 'all' }
            ]
        },
        rangeslider: { visible: true },
        type: 'date'
    };

    function Buttons({ selected, setSelected }) {
        const analyses = [
            'Trend ogólny',
            'Zmienność',
            'Anomalie i skoki',
            'Korelacje',
            'Sezonowość',
            'Wykres świecowy',
            'Backtesting strategii'
        ];
        return (
            <div style={{ marginTop: 20, textAlign: 'center' }}>
                {analyses.map((name, i) => (
                    <button
                        key={i + 1}
                        onClick={() => setSelected(i + 1)}
                        style={{
                            margin: '0 8px',
                            padding: '10px 16px',
                            backgroundColor: selected === i + 1 ? '#0056b3' : '#f0f0f0',
                            color: selected === i + 1 ? '#fff' : '#333',
                            border: '2px solid',
                            borderColor: selected === i + 1 ? '#004085' : '#ccc',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            transition: 'all 0.3s ease',
                            boxShadow: selected === i + 1 ? '0 4px 12px rgba(0, 86, 179, 0.4)' : 'none',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = selected === i + 1 ? '#004085' : '#e6e6e6';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = selected === i + 1 ? '#0056b3' : '#f0f0f0';
                        }}
                    >
                        {name}
                    </button>
                ))}
            </div>
        );
    }

    const centerWrapperStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '100%',
        padding: '0 10px',
    };

    const plotLayoutBase = {
        width: windowSize.width * 0.9,
        height: windowSize.height * 0.7,
    };

    if (selectedAnalysis === 1) {
        const sma50 = movingAverage(closePrices, 50);
        const sma200 = movingAverage(closePrices, 200);
        return (
            <div style={centerWrapperStyle}>
                <Plot
                    data={[
                        { x: dates, y: closePrices, type: 'scatter', mode: 'lines', name: 'Close' },
                        { x: dates, y: sma50, type: 'scatter', mode: 'lines', name: 'SMA 50' },
                        { x: dates, y: sma200, type: 'scatter', mode: 'lines', name: 'SMA 200' },
                    ]}
                    layout={{
                        ...plotLayoutBase,
                        title: 'Trend ogólny cen i średnie kroczące',
                        xaxis: xAxisDateConfig,
                        yaxis: { title: 'Cena' }
                    }}
                    style={{ maxWidth: '100%', height: '100%' }}
                />
                <span style={{ textAlign: 'center', marginTop: 10 }}>{descriptions[1]}</span>
                <Buttons selected={selectedAnalysis} setSelected={setSelectedAnalysis} />
            </div>
        );
    }

    if (selectedAnalysis === 2) {
        const volatility = highPrices.map((h, i) => h - lowPrices[i]);
        return (
            <div style={centerWrapperStyle}>
                <Plot
                    data={[
                        { x: dates, y: volatility, type: 'scatter', mode: 'lines+markers', name: 'Zmienność (High-Low)' }
                    ]}
                    layout={{
                        ...plotLayoutBase,
                        title: 'Zmienność (High - Low)',
                        xaxis: xAxisDateConfig,
                        yaxis: { title: 'Zmienność' }
                    }}
                    style={{ maxWidth: '100%', height: '100%' }}
                />
                <span style={{ textAlign: 'center', marginTop: 10 }}>{descriptions[2]}</span>
                <Buttons selected={selectedAnalysis} setSelected={setSelectedAnalysis} />
            </div>
        );
    }

    if (selectedAnalysis === 3) {
        const smaVolume = movingAverage(volumes, 20);
        return (
            <div style={centerWrapperStyle}>
                <Plot
                    data={[
                        { x: dates, y: volumes, type: 'scatter', mode: 'lines', name: 'Volume' },
                        { x: dates, y: smaVolume, type: 'scatter', mode: 'lines', name: '20-dniowa SMA wolumenu' },
                    ]}
                    layout={{
                        ...plotLayoutBase,
                        title: 'Objętość obrotu i średnia krocząca',
                        xaxis: xAxisDateConfig,
                        yaxis: { title: 'Wolumen' }
                    }}
                    style={{ maxWidth: '100%', height: '100%' }}
                />
                <span style={{ textAlign: 'center', marginTop: 10 }}>{descriptions[3]}</span>
                <Buttons selected={selectedAnalysis} setSelected={setSelectedAnalysis} />
            </div>
        );
    }

    if (selectedAnalysis === 4) {
        return (
            <div style={centerWrapperStyle}>
                <Plot
                    data={[
                        { x: volumes, y: closePrices, type: 'scatter', mode: 'markers', name: 'Volume vs Close' }
                    ]}
                    layout={{
                        ...plotLayoutBase,
                        title: 'Korelacja Volume i Close',
                        xaxis: { title: 'Volume' },
                        yaxis: { title: 'Close' }
                    }}
                    style={{ maxWidth: '100%', height: '100%' }}
                />
                <span style={{ textAlign: 'center', marginTop: 10 }}>{descriptions[4]}</span>
                <Buttons selected={selectedAnalysis} setSelected={setSelectedAnalysis} />
            </div>
        );
    }

    if (selectedAnalysis === 5) {
        const months = data.map(d => new Date(d.date).getMonth());
        let sums = Array(12).fill(0);
        let counts = Array(12).fill(0);
        months.forEach((m, i) => {
            sums[m] += closePrices[i];
            counts[m]++;
        });
        const averages = sums.map((sum, i) => counts[i] ? sum / counts[i] : 0);
        const monthNames = ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'];

        return (
            <div style={centerWrapperStyle}>
                <Plot
                    data={[
                        {
                            x: monthNames,
                            y: averages,
                            type: 'bar',
                            name: 'Średnia cena zamknięcia wg miesiąca',
                            marker: { color: '#1f77b4' }
                        }
                    ]}
                    layout={{
                        ...plotLayoutBase,
                        title: 'Analiza sezonowa: średnie ceny zamknięcia wg miesięcy',
                        xaxis: { title: 'Miesiąc' },
                        yaxis: { title: 'Średnia cena' }
                    }}
                    style={{ maxWidth: '100%', height: '100%' }}
                />
                <span style={{ textAlign: 'center', marginTop: 10 }}>{descriptions[5]}</span>
                <Buttons selected={selectedAnalysis} setSelected={setSelectedAnalysis} />
            </div>
        );
    }

    if (selectedAnalysis === 6) {
        return (
            <div style={centerWrapperStyle}>
                <Plot
                    data={[
                        {
                            x: dates,
                            open: openPrices,
                            high: highPrices,
                            low: lowPrices,
                            close: closePrices,
                            type: 'candlestick',
                            name: 'Wykres świecowy'
                        }
                    ]}
                    layout={{
                        ...plotLayoutBase,
                        title: 'Wykres świecowy',
                        xaxis: xAxisDateConfig,
                        yaxis: { title: 'Cena' }
                    }}
                    style={{ maxWidth: '100%', height: '100%' }}
                />
                <span style={{ textAlign: 'center', marginTop: 10 }}>{descriptions[6]}</span>
                <Buttons selected={selectedAnalysis} setSelected={setSelectedAnalysis} />
            </div>
        );
    }

    if (selectedAnalysis === 7) {
        const sma50 = movingAverage(closePrices, 50);
        const signals = closePrices.map((price, i) => (price > (sma50[i] || 0) ? 1 : 0));
        return (
            <div style={centerWrapperStyle}>
                <Plot
                    data={[
                        { x: dates, y: closePrices, type: 'scatter', mode: 'lines', name: 'Close' },
                        { x: dates, y: sma50, type: 'scatter', mode: 'lines', name: 'SMA 50' },
                        {
                            x: dates,
                            y: signals.map(s => s ? 0 : null),
                            mode: 'markers',
                            type: 'scatter',
                            name: 'Sygnał kupna',
                            marker: { color: 'green', size: 8, symbol: 'triangle-up' }
                        }
                    ]}
                    layout={{
                        ...plotLayoutBase,
                        title: 'Backtesting strategii (Close > SMA 50)',
                        xaxis: xAxisDateConfig,
                        yaxis: { title: 'Cena' }
                    }}
                    style={{ maxWidth: '100%', height: '100%' }}
                />
                <span style={{ textAlign: 'center', marginTop: 10 }}>{descriptions[7]}</span>
                <Buttons selected={selectedAnalysis} setSelected={setSelectedAnalysis} />
            </div>
        );
    }

    return <div>Wybierz analizę</div>;
}

export default App;
