import React from 'react';
import Card from './Card';
import { XIcon, LinkedInIcon, YouTubeIcon, OorjaChainLogo } from './icons';

const About: React.FC = () => {
    return (
        <div>
            <div className="text-center mb-12">
                <OorjaChainLogo className="h-24 w-24 mx-auto mb-4" />
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">About OorjaChain</h1>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                    Empowering Indian Homes with Solar Energy and Bitcoin
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <Card title="Our Mission">
                    <p className="text-gray-600 leading-relaxed">
                        At OorjaChain, our mission is to accelerate the adoption of renewable energy across India by making it profitable for homeowners. We believe that by decentralizing energy production and finance, we can create a more sustainable and equitable future. We provide a seamless platform that transforms surplus solar power into a valuable digital asset—Bitcoin.
                    </p>
                </Card>
                <Card title="How It Works">
                     <p className="text-gray-600 leading-relaxed">
                        Our innovative hardware and software solution connects to your existing solar panel system. When your panels generate more electricity than your home consumes, our system automatically diverts this excess power to mine Bitcoin. This process is fully automated, secure, and allows you to generate passive income from an otherwise wasted resource, all while supporting the global Bitcoin network.
                    </p>
                </Card>
            </div>

            <div className="max-w-5xl mx-auto mt-12 text-center bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                 <h3 className="text-2xl font-bold text-gray-800 mb-4">Join the Revolution</h3>
                 <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
                    Be part of a community that's at the forefront of the green energy and financial revolution. With OorjaChain, you're not just saving on electricity bills; you're investing in a brighter, decentralized future.
                 </p>
                 <div className="flex justify-center space-x-6">
                    <a href="#" aria-label="Follow us on X" className="text-gray-500 hover:text-gray-900"><XIcon className="h-6 w-6" /></a>
                    <a href="#" aria-label="Connect with us on LinkedIn" className="text-gray-500 hover:text-blue-700"><LinkedInIcon className="h-6 w-6" /></a>
                    <a href="#" aria-label="Subscribe to our YouTube channel" className="text-gray-500 hover:text-red-600"><YouTubeIcon className="h-6 w-6" /></a>
                 </div>
            </div>
        </div>
    );
};

export default About;
