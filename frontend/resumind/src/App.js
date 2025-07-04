import React, { useState } from 'react';
import logo from './ResuMind_Logo.png';
import './App.css';
import './styles.css';
import CardDeck from './components/CardDeck';

function App() {
  const [page, setPage] = useState('home');
  const [matchedJobs, setMatchedJobs] = useState([]);

  const renderHomePage = () => (
    <div className="home-page">
      <header className="header">
        <img src={logo} alt="ResuMind Logo" className="logo" />
        <h1>
          <span style={{ color: 'black' }}>Resu</span>
          <span style={{ color: '#007bff' }}>Mind</span>
        </h1>
        <p className="tagline">It's like Tinder... but for job searching!</p>
      </header>
      <section className="intro">
        <p>
          Whether you are actively or passively searching for a job, looking for new opportunities can be overwhelming due to:
          <ul>
            <li>High volume of listings on job sites such as Indeed, LinkedIn, Monster</li>
            <li>Lack of matching/relevant skills</li>
            <li>Fake job postings</li>
          </ul>
          There is a clear need for a smarter, more personalized approach to job discovery—one that truly understands the applicant, while making the job selection process simple and clear.
        </p>
        <p>
          ResuMind is an AI-powered job assistant that personalizes the job search experience for job seekers who struggle to find roles that match their skills and career goals. Our application uses natural language processing to recommend verified job opportunities and helps users understand how closely they fit the role.
        </p>
        <ul>
          <li>Reduced job search time</li>
          <li>Skill match insights</li>
          <li>Resume feedback</li>
          <li>Interview prep</li>
        </ul>
      </section>
      <section className="profile-section">
        <h1>
          <span style={{ color: 'black' }}>Your </span>
          <span style={{ color: '#007bff' }}>Profile</span>
        </h1>
        <input type="text" placeholder="Your Name" />
        <input type="text" placeholder="Job Title / Aspiring Role" />
        <div className="upload-buttons">
          <button>Upload Profile Picture</button>
          <button>Upload Resume</button>
        </div>
      </section>
      <footer className="stats-section">
        <h1>
          <span style={{ color: 'black' }}>What People Are </span>
          <span style={{ color: '#007bff' }}>Saying</span>
        </h1>
        <p>"Landed my dream job in just 2 weeks!" – Sarah K.</p>
        <p>"Finally, job hunting feels easy and smart." – Jamal B.</p>
        <p>"I understood why I wasn’t getting interviews!" – Priya M.</p>
      </footer>
    </div>
  );

  const renderJobSearchPage = () => (
    <div className="job-search-page">
      <input type="text" className="job-search-bar" placeholder="Search for jobs..." />
      <p className="swipe-instructions">
        Swipe left to dismiss a job, and swipe right if you're interested in learning more about the role
      </p>
      <CardDeck onMatch={(job) => setMatchedJobs((prev) => [...prev, job])} />
      <section className="saved-jobs">
        <h2>Saved Jobs</h2>
        {/* Placeholder for saved jobs */}
        <p>You haven't saved any jobs yet.</p>
      </section>
    </div>
  );

  const renderMatchedJobsPage = () => (
    <div className="matched-jobs-page">
      <h2>Matched Jobs</h2>
      <ul className="matched-job-list">
        {matchedJobs.map((job, i) => (
          <li key={i}>
            <strong>{job.title}</strong><br />
            Match: {job.match || '85%'} | Response Likelihood: {job.likelihood || 'High'}<br />
            <button>Apply Now</button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="main-container">
      <nav className="navbar">
        <button onClick={() => setPage('home')}>Home</button>
        <button onClick={() => setPage('search')}>Job Search</button>
        <button onClick={() => setPage('matches')}>Matched Jobs</button>
      </nav>
      {page === 'home' && renderHomePage()}
      {page === 'search' && renderJobSearchPage()}
      {page === 'matches' && renderMatchedJobsPage()}
    </div>
  );
}

export default App;