import React from 'react';
import { Transaction } from '../types';
import Card from './Card';

const allTransactions: Transaction[] = [
    { id: 'tx123', date: '2023-10-26', amountBTC: 0.0012, amountINR: 6600, network: 'Bitcoin', address: 'bc1q...', status: 'Completed' },
    { id: 'tx124', date: '2023-10-25', amountBTC: 0.0008, amountINR: 4400, network: 'Bitcoin', address: 'bc1q...', status: 'Completed' },
    { id: 'tx125', date: '2023-10-24', amountBTC: 0.0015, amountINR: 8250, network: 'Bitcoin', address: 'bc1q...', status: 'Pending' },
    { id: 'tx126', date: '2023-10-23', amountBTC: 0.0011, amountINR: 6050, network: 'Bitcoin', address: 'bc1q...', status: 'Completed' },
    { id: 'tx127', date: '2023-10-22', amountBTC: 0.0009, amountINR: 4950, network: 'Bitcoin', address: 'bc1q...', status: 'Completed' },
    { id: 'tx128', date: '2023-10-21', amountBTC: 0.0020, amountINR: 11000, network: 'Bitcoin', address: 'bc1q...', status: 'Failed' },
    { id: 'tx129', date: '2023-10-20', amountBTC: 0.0013, amountINR: 7150, network: 'Bitcoin', address: 'bc1q...', status: 'Completed' },
];

const Wallet: React.FC = () => {
    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">My Wallet</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card title="Wallet Address">
                    <p className="text-sm font-mono bg-gray-100 p-2 rounded break-all">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</p>
                    <button onClick={() => navigator.clipboard.writeText('bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh')} className="mt-2 text-sm text-amber-600 hover:underline">Copy Address</button>
                </Card>
                <Card title="Total Balance">
                    <p className="text-3xl font-bold text-gray-800">0.018 BTC</p>
                    <p className="text-gray-500">~ 99,000 INR</p>
                </Card>
            </div>

            <Card title="Transaction History">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b text-gray-500">
                                <th className="p-3 font-semibold">Date</th>
                                <th className="p-3 font-semibold">Amount (BTC)</th>
                                <th className="p-3 font-semibold">Amount (INR)</th>
                                <th className="p-3 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allTransactions.map(tx => (
                                <tr key={tx.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{tx.date}</td>
                                    <td className="p-3 font-medium text-gray-800">{tx.amountBTC.toFixed(4)}</td>
                                    <td className="p-3">₹{tx.amountINR.toLocaleString('en-IN')}</td>
                                    <td className="p-3">
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                            tx.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                            tx.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default Wallet;
