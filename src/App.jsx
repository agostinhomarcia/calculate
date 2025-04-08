import { useState, useEffect } from "react";
import "./App.css";
import { SEO } from "./components/SEO";
import { seoData } from "./seoData";

function App() {
  const [activeCalculator, setActiveCalculator] = useState("percentage");
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="app">
      <SEO calculator={activeCalculator} />
      <header>
        <div className="header-content">
          <h1>Calculadoras Úteis - Sua Ferramenta Online</h1>
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label={`Alternar para tema ${
              theme === "light" ? "escuro" : "claro"
            }`}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
        <nav>
          {Object.entries(seoData).map(([key, data]) => (
            <button
              key={key}
              className={activeCalculator === key ? "active" : ""}
              onClick={() => setActiveCalculator(key)}
            >
              {data.h1}
            </button>
          ))}
        </nav>
      </header>
      <main>
        {activeCalculator === "percentage" && <PercentageCalculator />}
        {activeCalculator === "fuelCalc" && <FuelCalculator />}
        {activeCalculator === "profitMargin" && <ProfitMarginCalculator />}
        {activeCalculator === "compoundInterest" && (
          <CompoundInterestCalculator />
        )}
        {activeCalculator === "unitConverter" && <UnitConverter />}
        {activeCalculator === "discount" && <DiscountCalculator />}
        {activeCalculator === "bmi" && <BMICalculator />}
        {activeCalculator === "billSplit" && <BillSplitCalculator />}
        <div className="calculator-description">
          <p>{seoData[activeCalculator]?.description}</p>
        </div>
      </main>
      <button
        className={`back-to-top ${showBackToTop ? "visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Voltar ao topo"
      >
        ↑
      </button>
    </div>
  );
}

function PercentageCalculator() {
  const [value, setValue] = useState("");
  const [percentage, setPercentage] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const numValue = parseFloat(value);
    const numPercentage = parseFloat(percentage);
    if (!isNaN(numValue) && !isNaN(numPercentage)) {
      setResult((numValue * numPercentage) / 100);
    }
  };

  return (
    <div className="calculator">
      <h2>Calculadora de Porcentagem</h2>
      <div className="input-group">
        <input
          type="number"
          placeholder="Valor"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <input
          type="number"
          placeholder="Porcentagem"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
        />
        <button className="calculate" onClick={calculate}>
          Calcular
        </button>
      </div>
      {result !== null && (
        <div className="result">
          <p>
            {percentage}% de {value} = {result.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}

function FuelCalculator() {
  const [distance, setDistance] = useState("");
  const [fuelUsed, setFuelUsed] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const distanceNum = parseFloat(distance);
    const fuelUsedNum = parseFloat(fuelUsed);
    const fuelPriceNum = parseFloat(fuelPrice);

    if (
      !isNaN(distanceNum) &&
      !isNaN(fuelUsedNum) &&
      !isNaN(fuelPriceNum) &&
      fuelUsedNum > 0
    ) {
      const kmPerLiter = distanceNum / fuelUsedNum;
      const costPerKm = fuelPriceNum / kmPerLiter;
      const totalCost = fuelUsedNum * fuelPriceNum;

      setResult({
        kmPerLiter,
        costPerKm,
        totalCost,
      });
    }
  };

  return (
    <div className="calculator">
      <h2>Calculadora de Combustível</h2>
      <div className="input-group">
        <input
          type="number"
          placeholder="Distância percorrida (km)"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />
        <input
          type="number"
          placeholder="Combustível usado (litros)"
          value={fuelUsed}
          onChange={(e) => setFuelUsed(e.target.value)}
        />
        <input
          type="number"
          placeholder="Preço do combustível (R$/L)"
          value={fuelPrice}
          onChange={(e) => setFuelPrice(e.target.value)}
        />
        <button className="calculate" onClick={calculate}>
          Calcular
        </button>
      </div>
      {result !== null && (
        <div className="result">
          <p>Consumo: {result.kmPerLiter.toFixed(1)} km/L</p>
          <p>Custo por km: R$ {result.costPerKm.toFixed(2)}/km</p>
          <p>Custo total: R$ {result.totalCost.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

function ProfitMarginCalculator() {
  const [cost, setCost] = useState("");
  const [price, setPrice] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const numCost = parseFloat(cost);
    const numPrice = parseFloat(price);
    if (!isNaN(numCost) && !isNaN(numPrice)) {
      setResult(((numPrice - numCost) / numPrice) * 100);
    }
  };

  return (
    <div className="calculator">
      <h2>Margem de Lucro</h2>
      <div className="input-group">
        <input
          type="number"
          placeholder="Custo"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
        <input
          type="number"
          placeholder="Preço de Venda"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button className="calculate" onClick={calculate}>
          Calcular
        </button>
      </div>
      {result !== null && (
        <div className="result">
          <p>Margem de Lucro: {result.toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
}

function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    if (!isNaN(p) && !isNaN(r) && !isNaN(t)) {
      setResult(p * Math.pow(1 + r, t));
    }
  };

  return (
    <div className="calculator">
      <h2>Juros Compostos</h2>
      <div className="input-group">
        <input
          type="number"
          placeholder="Valor Inicial"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
        />
        <input
          type="number"
          placeholder="Taxa de Juros (%)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />
        <input
          type="number"
          placeholder="Período (meses)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button className="calculate" onClick={calculate}>
          Calcular
        </button>
      </div>
      {result !== null && (
        <div className="result">
          <p>Valor Final: R$ {result.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

function UnitConverter() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("km");
  const [toUnit, setToUnit] = useState("m");
  const [result, setResult] = useState(null);

  const units = {
    distance: {
      km: { m: 1000, cm: 100000 },
      m: { km: 0.001, cm: 100 },
      cm: { km: 0.00001, m: 0.01 },
    },
    weight: {
      kg: { g: 1000, mg: 1000000 },
      g: { kg: 0.001, mg: 1000 },
      mg: { kg: 0.000001, g: 0.001 },
    },
    volume: {
      l: { ml: 1000 },
      ml: { l: 0.001 },
    },
  };

  const unitGroups = {
    distance: ["km", "m", "cm"],
    weight: ["kg", "g", "mg"],
    volume: ["l", "ml"],
  };

  const convert = () => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      const group = Object.entries(unitGroups).find(
        (entry) => entry[1].includes(fromUnit) && entry[1].includes(toUnit)
      )?.[0];

      if (group && units[group][fromUnit] && units[group][fromUnit][toUnit]) {
        setResult(numValue * units[group][fromUnit][toUnit]);
      }
    }
  };

  return (
    <div className="calculator">
      <h2>Conversão de Unidades</h2>
      <div className="input-group">
        <input
          type="number"
          placeholder="Valor"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
          <optgroup label="Distância">
            <option value="km">Quilômetros (km)</option>
            <option value="m">Metros (m)</option>
            <option value="cm">Centímetros (cm)</option>
          </optgroup>
          <optgroup label="Peso">
            <option value="kg">Quilogramas (kg)</option>
            <option value="g">Gramas (g)</option>
            <option value="mg">Miligramas (mg)</option>
          </optgroup>
          <optgroup label="Volume">
            <option value="l">Litros (l)</option>
            <option value="ml">Mililitros (ml)</option>
          </optgroup>
        </select>
        <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
          <optgroup label="Distância">
            <option value="km">Quilômetros (km)</option>
            <option value="m">Metros (m)</option>
            <option value="cm">Centímetros (cm)</option>
          </optgroup>
          <optgroup label="Peso">
            <option value="kg">Quilogramas (kg)</option>
            <option value="g">Gramas (g)</option>
            <option value="mg">Miligramas (mg)</option>
          </optgroup>
          <optgroup label="Volume">
            <option value="l">Litros (l)</option>
            <option value="ml">Mililitros (ml)</option>
          </optgroup>
        </select>
        <button className="calculate" onClick={convert}>
          Converter
        </button>
      </div>
      {result !== null && (
        <div className="result">
          <p>
            {value} {fromUnit} = {result} {toUnit}
          </p>
        </div>
      )}
    </div>
  );
}

function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercentage);
    if (!isNaN(price) && !isNaN(discount)) {
      const discountAmount = (price * discount) / 100;
      const finalPrice = price - discountAmount;
      setResult({
        discountAmount,
        finalPrice,
      });
    }
  };

  return (
    <div className="calculator">
      <h2>Desconto de Produtos</h2>
      <div className="input-group">
        <input
          type="number"
          placeholder="Preço Original"
          value={originalPrice}
          onChange={(e) => setOriginalPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Porcentagem de Desconto"
          value={discountPercentage}
          onChange={(e) => setDiscountPercentage(e.target.value)}
        />
        <button className="calculate" onClick={calculate}>
          Calcular
        </button>
      </div>
      {result !== null && (
        <div className="result">
          <p>Desconto: R$ {result.discountAmount.toFixed(2)}</p>
          <p>Preço Final: R$ {result.finalPrice.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState(null);

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return "Abaixo do peso";
    if (bmi < 25) return "Peso normal";
    if (bmi < 30) return "Sobrepeso";
    if (bmi < 35) return "Obesidade grau 1";
    if (bmi < 40) return "Obesidade grau 2";
    return "Obesidade grau 3";
  };

  const calculate = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100; // convertendo cm para m
    if (!isNaN(weightNum) && !isNaN(heightNum) && heightNum > 0) {
      const bmi = weightNum / (heightNum * heightNum);
      setResult({
        bmi,
        category: getBMICategory(bmi),
      });
    }
  };

  return (
    <div className="calculator">
      <h2>Calculadora de IMC</h2>
      <div className="input-group">
        <input
          type="number"
          placeholder="Peso (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <input
          type="number"
          placeholder="Altura (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <button className="calculate" onClick={calculate}>
          Calcular
        </button>
      </div>
      {result !== null && (
        <div className="result">
          <p>Seu IMC: {result.bmi.toFixed(1)}</p>
          <p>Classificação: {result.category}</p>
        </div>
      )}
    </div>
  );
}

function BillSplitCalculator() {
  const [totalBill, setTotalBill] = useState("");
  const [numPeople, setNumPeople] = useState("");
  const [tip, setTip] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const bill = parseFloat(totalBill);
    const people = parseInt(numPeople);
    const tipPercent = parseFloat(tip) || 0;

    if (!isNaN(bill) && !isNaN(people) && people > 0) {
      const tipAmount = (bill * tipPercent) / 100;
      const total = bill + tipAmount;
      const perPerson = total / people;

      setResult({
        tipAmount,
        total,
        perPerson,
      });
    }
  };

  return (
    <div className="calculator">
      <h2>Divisão de Contas</h2>
      <div className="input-group">
        <input
          type="number"
          placeholder="Valor Total da Conta"
          value={totalBill}
          onChange={(e) => setTotalBill(e.target.value)}
        />
        <input
          type="number"
          placeholder="Número de Pessoas"
          value={numPeople}
          onChange={(e) => setNumPeople(e.target.value)}
        />
        <input
          type="number"
          placeholder="Gorjeta (%)"
          value={tip}
          onChange={(e) => setTip(e.target.value)}
        />
        <button className="calculate" onClick={calculate}>
          Calcular
        </button>
      </div>
      {result !== null && (
        <div className="result">
          <p>Gorjeta: R$ {result.tipAmount.toFixed(2)}</p>
          <p>Total com Gorjeta: R$ {result.total.toFixed(2)}</p>
          <p>Valor por Pessoa: R$ {result.perPerson.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

export default App;
