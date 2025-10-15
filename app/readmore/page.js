"use client"
import React from 'react';
import Link from 'next/link';

// Mock icons (assuming lucide-react or similar icon library is available)
// Replace these with actual imports if you are using an icon library like lucide-react
const CheckCircle = (props) => <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;
const Zap = (props) => <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>;
const Users = (props) => <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h-7a4 4 0 01-4-4v-2a4 4 0 014-4h7m0 10a4 4 0 01-4-4v-2a4 4 0 014-4m-7 4h10m-3 0V7a4 4 0 014-4h1a1 1 0 011 1v12a1 1 0 01-1 1h-1a4 4 0 01-4-4z"></path></svg>;
const Shield = (props) => <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;
const TrendingUp = (props) => <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>;
const Globe = (props) => <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-9v18"></path></svg>;

// Main Component
export default function App() {
  
  // Custom Card Component for Features/Steps
  const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="p-3 mb-4 rounded-full bg-indigo-500/10 text-indigo-600">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );

  // Custom Step Component for How It Works
  const StepItem = ({ number, title, description, isLast }) => (
    <div className="flex items-start md:items-center relative">
      {!isLast && (
        <div className="hidden md:block absolute w-px h-fullbg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] left-10 top-14"></div>
      )}
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white font-bold text-lg flex items-center justify-center z-10 shadow-md">
        {number}
      </div>
      <div className="ml-6 flex-grow pb-12">
        <h4 className="text-xl font-semibold text-gray-900 mb-1">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );

  return (
    <div className="font-sans antialiased text-gray-800">
      
      {/* Navigation (Placeholder) */}
      <header className="py-4 px-6 shadow-sm sticky top-0 z-20  bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center  bg-gray-800">
          <h1 className="text-2xl font-bold">FundOra</h1>
          <nav>
            <Link href="/Home" className=" hover:text-indigo-700 font-medium">Back to Home</Link>
          </nav>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-indigo-600 font-semibold uppercase tracking-wider mb-2">The Future of Capital</p>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-white mb-6 leading-tight">
            Democratizing <span className="text-indigo-600">Funding</span> for Tomorrow&apos;s Innovators
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto mb-10">
            FundOra connects ambitious startups with a global community of investors, making the process faster, more transparent, and accessible to everyone.
          </p>
          <Link href='/login'><button 
            
            className="px-10 py-4 bg-indigo-600 text-white text-xl font-bold rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Start Your Journey Today
          </button></Link>
        </div>
      </section>

      {/* --- VALUE PROPOSITION / FEATURES SECTION --- */}
      <section className="py-20 bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">Why Choose FundOra?</h2>
            <p className="max-w-2xl mx-auto text-lg text-white">
                We bridge the gap between capital and creativity with a platform built on trust, technology, and real-time data.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard 
              icon={TrendingUp}
              title="Global Access"
              description="Tap into a diverse pool of opportunities and investors from around the world, eliminating geographical barriers."
            />
            <FeatureCard 
              icon={Shield}
              title="Verified Security"
              description="All projects and funding rounds undergo rigorous due diligence and are protected by blockchain-backed security protocols."
            />
            <FeatureCard 
              icon={CheckCircle}
              title="Transparent Process"
              description="Track investment progress and milestone achievements in real-time with our clear and simple dashboard."
            />
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS SECTION --- */}
      <section className="py-20 bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">Simple Steps to Success</h2>
            <p className="max-w-2xl mx-auto text-lg text-white">
                Whether you&apos;re raising capital or looking to invest, our guided process ensures a smooth experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             {/* Timeline / Step Container for Innovators */}
             <div className="bg-gray-50 p-6 rounded-xl shadow-xl">
                <h3 className="text-2xl font-bold text-indigo-600 mb-6 border-b pb-3">For Innovators (Raising Funds)</h3>
                <StepItem 
                    number={1} 
                    title="Profile & Pitch Creation" 
                    description="Submit your business plan and financial projections through our structured template." 
                />
                <StepItem 
                    number={2} 
                    title="Verification & Vetting" 
                    description="Our team conducts legal and financial reviews to verify your project's readiness." 
                />
                <StepItem 
                    number={3} 
                    title="Launch Funding Round" 
                    description="Go live on the platform and start accepting secure investments globally." 
                    isLast={true}
                />
             </div>

             {/* Timeline / Step Container for Investors */}
             <div className="bg-gray-50 p-6 rounded-xl shadow-xl">
                <h3 className="text-2xl font-bold text-indigo-600 mb-6 border-b pb-3">For Investors (Finding Deals)</h3>
                <StepItem 
                    number={1} 
                    title="Set Investment Criteria" 
                    description="Define your focus (e.g., sector, stage, amount) to find relevant opportunities quickly." 
                />
                <StepItem 
                    number={2} 
                    title="Due Diligence Tools" 
                    description="Access detailed project data, financial models, and communicate directly with founders." 
                />
                <StepItem 
                    number={3} 
                    title="Execute Investment" 
                    description="Commit capital securely and digitally, receiving real-time equity confirmation." 
                    isLast={true}
                />
             </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS / SOCIAL PROOF (Mock Data) --- */}
      <section className="py-20 bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">Trusted by the Community</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-50">
                Join thousands of innovators and investors already accelerating growth with FundOra.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-indigo-50 rounded-xl shadow-lg border-l-4 border-indigo-600">
                <blockquote className="italic text-gray-700 mb-4">
                    "We secured our seed funding in 45 days. The transparency and access to global capital on FundOra is unmatched. Highly recommend for any serious startup."
                </blockquote>
                <p className="font-semibold text-gray-900">- Jane D., Founder of NovaTech</p>
                <p className="text-sm text-gray-500">Raised $750,000</p>
            </div>
            <div className="p-6 bg-indigo-50 rounded-xl shadow-lg border-l-4 border-indigo-600">
                <blockquote className="italic text-gray-700 mb-4">
                    "The quality of vetted deals is superior to anything I've seen on other platforms. FundOra makes it easy to diversify my portfolio into cutting-edge tech."
                </blockquote>
                <p className="font-semibold text-gray-900">- Robert L., Angel Investor</p>
                <p className="text-sm text-gray-500">24 Investments Made</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* --- FINAL CTA SECTION --- */}
      <section className="bg-indigo-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Ready to Grow with FundOra?</h2>
          <p className="text-xl text-indigo-200 max-w-3xl mx-auto mb-8">
            Sign up today to explore new investment opportunities or to launch your own successful funding round.
          </p>
          <Link href='/login'><button 
            
            className="px-10 py-4 bg-white text-indigo-600 text-xl font-bold rounded-full shadow-2xl hover:bg-gray-100 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
          >
            Create Your Free Account
          </button></Link>
        </div>
      </section>

      {/* Footer (Placeholder) */}
      <footer className="py-6 bg-gray-900 text-center">
        <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} FundOra. All rights reserved.</p>
      </footer>
    </div>
  );
}
