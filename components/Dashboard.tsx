import React from 'react';
import Card from './Card';
import { Transaction } from '../types';
import { BitcoinIcon } from './icons';

// Mock data
const recentTransactions: Transaction[] = [
    { id: 'tx123', date: '2023-10-26', amountBTC: 0.0012, amountINR: 6600, network: 'Bitcoin', address: 'bc1q...', status: 'Completed' },
    { id: 'tx124', date: '2023-10-25', amountBTC: 0.0008, amountINR: 4400, network: 'Bitcoin', address: 'bc1q...', status: 'Completed' },
    { id: 'tx125', date: '2023-10-24', amountBTC: 0.0015, amountINR: 8250, network: 'Bitcoin', address: 'bc1q...', status: 'Pending' },
];


const Dashboard: React.FC = () => {
  return (
    <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <Card title="Total Earnings (BTC)">
                <div className="flex items-center">
                    <BitcoinIcon className="h-8 w-8 text-amber-500 mr-3" />
                    <p className="text-3xl font-bold text-gray-800">0.018 BTC</p>
                </div>
                <p className="text-gray-500 mt-2">~ 99,000 INR</p>
            </Card>
            <Card title="Current Hashrate">
                 <div className="flex items-center">
                    <p className="text-3xl font-bold text-gray-800">15 TH/s</p>
                </div>
                <p className="text-gray-500 mt-2">Stable Performance</p>
            </Card>
            <Card title="System Status">
                <div className="flex items-center">
                    <div className="h-4 w-4 rounded-full bg-green-500 mr-3 animate-pulse"></div>
                    <p className="text-xl font-semibold text-gray-800">Online & Mining</p>
                </div>
                <p className="text-gray-500 mt-2">All systems operational.</p>
            </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Earnings Overview (Last 6 Months)">
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500 italic">Earnings chart would be displayed here.</p>
                </div>
            </Card>
            <Card title="Recent Transactions">
                <div className="space-y-4">
                    {recentTransactions.map(tx => (
                        <div key={tx.id} className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-gray-700">{tx.amountBTC.toFixed(4)} BTC</p>
                                <p className="text-sm text-gray-500">{tx.date}</p>
                            </div>
                            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                                tx.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                tx.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                            }`}>
                                {tx.status}
                            </span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    </div>
  );
};

export default Dashboard;
