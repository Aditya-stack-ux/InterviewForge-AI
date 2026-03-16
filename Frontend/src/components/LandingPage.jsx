import { Link } from "react-router"
import "../style/landing.scss"

const Landing = () => {
  return (
    <main className="landing">


      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-grid" aria-hidden="true" />
        <div className="hero-orb hero-orb-1" aria-hidden="true" />
        <div className="hero-orb hero-orb-2" aria-hidden="true" />

        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            AI-Powered Interview Coach
          </div>

          <h1>
            Land Your Dream Job<br />
            with <span className="gradient-text">AI Precision</span>
          </h1>

          <p className="hero-subtitle">
            Upload your resume and job description. Our AI crafts tailored interview
            questions, model answers, and a personalized preparation roadmap — in seconds.
          </p>

          <div className="hero-buttons">
            <Link to="/dashboard" className="primary-btn primary-btn--lg">
              Start Preparing Free
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link to="/login" className="ghost-btn">
              Sign In
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <strong>10k+</strong>
              <span>Interviews Prepared</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <strong>95%</strong>
              <span>User Satisfaction</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <strong>30s</strong>
              <span>To Get Started</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="section-label">What You Get</div>
        <h2>Everything You Need to Prepare for Interviews</h2>
        <p className="section-subtitle">
          From preparation to practice, InterviewForge covers every step of your interview journey.
        </p>

        <div className="feature-grid">
          <div className="feature-card feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 12h6M9 16h6M9 8h6M5 4h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1z" stroke="#ff2d78" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Smart Resume Analysis</h3>
            <p>Upload your resume and our AI extracts your skills, experience, and achievements to tailor every question to your unique profile.</p>
            <div className="feature-tag">PDF &amp; DOCX supported</div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" stroke="#ff2d78" strokeWidth="1.5"/>
                <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke="#ff2d78" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>AI Question Generator</h3>
            <p>Get both technical and behavioral questions tailored to the exact role you're applying for.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M8 12l3 3 5-5M3 12a9 9 0 1018 0 9 9 0 00-18 0z" stroke="#ff2d78" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Model Answers</h3>
            <p>See how expert candidates answer each question. Understand structure, tone, and what interviewers look for.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 19V6l12-3v13M9 19a2 2 0 01-4 0V9a2 2 0 014 0M21 16a2 2 0 01-4 0V6a2 2 0 014 0" stroke="#ff2d78" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Preparation Roadmap</h3>
            <p>A structured, prioritized study plan showing exactly which topics to focus on before interview day.</p>
          </div>
            <div className="feature-card feature-card">
  <div className="feature-icon">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M8 4h8M8 8h8M8 12h6M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
      stroke="#ff2d78" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  </div>

  <h3>AI Resume Generator</h3>

  <p>
    Generate an optimized resume tailored to the job description. 
    Our AI uses your resume analysis and the job requirements 
    to create a stronger, role-focused resume.
  </p>

  <div className="feature-tag">AI Optimized Resume</div>
</div>
      
        </div>
        
      </section>

      {/* HOW IT WORKS */}
      <section className="workflow">
        <div className="section-label">Process</div>
        <h2>From Upload to Interview-Ready</h2>
        <p className="section-subtitle">
          Four simple steps to transform your preparation in under a minute.
        </p>

        <div className="steps-container">
          <div className="steps-line" aria-hidden="true" />
          <div className="steps">
            <div className="step">
              <div className="step-number">01</div>
              <div className="step-body">
                <h3>Upload Your Resume</h3>
                <p>Drop in your resume file. We parse your full work history and skills instantly.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">02</div>
              <div className="step-body">
                <h3>Add Job Description</h3>
                <p>Paste the job posting. Our AI maps requirements to your background.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">03</div>
              <div className="step-body">
                <h3>AI Generates Content</h3>
                <p>Receive tailored questions, expert answers, and a topic study plan within seconds.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">04</div>
              <div className="step-body">
                <h3>Download &amp; Practice</h3>
                <p>Export your full report and walk into your interview fully prepared.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-section">
        <div className="cta-orb" aria-hidden="true" />
        <div className="cta-content">
          <h2>Ready to nail your next interview?</h2>
          <p>Join thousands of candidates who prepared smarter with PrepAI.</p>
          <Link to="/dashboard" className="primary-btn primary-btn--lg">
            Get Started — It's Free
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">
          <span className="logo-icon">⬡</span>
          <span className="logo-text">InterviewForge</span>
        </div>
        <p>© 2025 InterviewForge. All rights reserved.</p>
      </footer>

    </main>
  )
}

export default Landing