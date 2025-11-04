import React, { useState } from 'react';
import { CalculatorInput, GeminiResponse } from '../types';
import { calculateEarningPotential } from '../services/geminiService';
import Card from './Card';

const Calculator: React.FC = () => {
  const [input, setInput] = useState<CalculatorInput>({
    panelCapacity: 5,
    sunlightHours: 5,
    electricityCost: 8,
    excessPowerAllocation: 50,
  });
  const [response, setResponse] = useState<GeminiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await calculateEarningPotential(input);
      setResponse(result);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Earnings Calculator</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Enter Your System Details">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="panelCapacity" className="block text-sm font-medium text-gray-700">Solar Panel Capacity (kWp)</label>
              <input type="number" name="panelCapacity" id="panelCapacity" value={input.panelCapacity} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm" required />
            </div>
            <div>
              <label htmlFor="sunlightHours" className="block text-sm font-medium text-gray-700">Average Daily Sunlight (hours)</label>
              <input type="number" name="sunlightHours" id="sunlightHours" value={input.sunlightHours} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm" required />
            </div>
            <div>
              <label htmlFor="electricityCost" className="block text-sm font-medium text-gray-700">Your Electricity Cost (INR/kWh)</label>
              <input type="number" name="electricityCost" id="electricityCost" value={input.electricityCost} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm" required />
            </div>
            <div>
                <label htmlFor="excessPowerAllocation" className="block text-sm font-medium text-gray-700">Excess Power for Mining (%)</label>
                <input type="range" min="0" max="100" step="5" name="excessPowerAllocation" id="excessPowerAllocation" value={input.excessPowerAllocation} onChange={handleInputChange} className="mt-1 block w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500" />
                <div className="text-center font-bold text-amber-600 mt-2">{input.excessPowerAllocation}%</div>
            </div>
            <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
              {isLoading ? 'Calculating...' : 'Calculate Potential'}
            </button>
          </form>
        </Card>

        <div className="flex flex-col gap-6">
          {isLoading && (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500"></div>
            </div>
          )}
          {error && (
            <Card title="Error">
              <p className="text-red-600">{error}</p>
            </Card>
          )}
          {response && (
            <>
                <Card title="Estimated Earnings">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                        <div>
                            <p className="text-sm text-gray-500">Daily</p>
                            <p className="text-lg font-bold text-gray-800">{response.dailyEarningsBTC.toFixed(6)} BTC</p>
                            <p className="text-sm text-gray-600">~ ₹{response.dailyEarningsINR.toLocaleString('en-IN')}</p>
                        </div>
                         <div>
                            <p className="text-sm text-gray-500">Monthly</p>
                            <p className="text-lg font-bold text-gray-800">{response.monthlyEarningsBTC.toFixed(5)} BTC</p>
                             <p className="text-sm text-gray-600">~ ₹{response.monthlyEarningsINR.toLocaleString('en-IN')}</p>
                        </div>
                        <div className="col-span-1 sm:col-span-2 mt-2">
                             <p className="text-sm text-gray-500">Yearly</p>
                            <p className="text-2xl font-bold text-amber-600">{response.yearlyEarningsBTC.toFixed(4)} BTC</p>
                             <p className="text-lg text-gray-600">~ ₹{response.yearlyEarningsINR.toLocaleString('en-IN')}</p>
                        </div>
                    </div>
                </Card>
                 <Card title="AI Analysis">
                    <p className="text-gray-700 italic">{response.analysis}</p>
                </Card>
                <Card title="Assumptions">
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {response.assumptions.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
