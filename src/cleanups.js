import React, { useEffect, useState, useRef } from 'react';
import Header from './header';
import Footer from './footer';
import './Homepage.css';
import './cleanups.css';

function Cleanups() {
  const [contentVisible, setContentVisible] = useState(false);

  // Refs for animated sections
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const recentRef = useRef(null);
  const galleryRef = useRef(null);
  const methodologyRef = useRef(null);
  const impactRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Reset all animation classes
    [
      heroRef,
      statsRef,
      recentRef,
      galleryRef,
      methodologyRef,
      impactRef,
      ctaRef
    ].forEach(ref => {
      if (ref.current) {
        ref.current.classList.remove('visible');
      }
    });

    // Trigger content animation after short delay
    const timer = setTimeout(() => {
      setContentVisible(true);
      [
        heroRef,
        statsRef,
        recentRef,
        galleryRef,
        methodologyRef,
        impactRef,
        ctaRef
      ].forEach(ref => {
        if (ref.current) {
          ref.current.classList.add('visible');
        }
      });
    }, 100);

    return () => {
      setContentVisible(false);
      clearTimeout(timer);
      [
        heroRef,
        statsRef,
        recentRef,
        galleryRef,
        methodologyRef,
        impactRef,
        ctaRef
      ].forEach(ref => {
        if (ref.current) {
          ref.current.classList.remove('visible');
        }
      });
    };
  }, []);

  return (
    <div className="cleanups-page">
      <Header currentPage="cleanups" />
      <div className={`cleanups-page-content${contentVisible ? ' visible' : ''}`}>
        {/* Hero Section - visible on load */}
        <div className="hero-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        <div
          className="about-content-wrapper visible"
          style={{
            marginBottom: 0,
            paddingBottom: 0,
            minHeight: "unset"
          }}
        >
          <section
            className="simple-hero"
            ref={heroRef}
            style={{
              opacity: 1,
              transform: 'none',
              marginBottom: 0,
              paddingBottom: 0,
              paddingTop: 0
            }}
          >
            <div className="simple-hero-content" style={{ marginBottom: 0, paddingBottom: 0 }}>
              <h1>Cleanup Documentation</h1>
              <p>
                Witness the transformative power of community action. Our comprehensive cleanup documentation
                showcases the ongoing battle against plastic pollution in Philippine waterways.
              </p>
            </div>
          </section>
        </div>

        {/* Impact Section*/}
        <section id="impact" className="impact" ref={statsRef} style={{ background: "#fff" }}>
          <h2>Our Impact</h2>
          <div className="divider"><div className="water-drop"></div></div>
          <div className="impact-stats">
            <div className="stat-card" style={{ background: "#bbdefb" }}>
              <div className="stat-number counter" style={{ color: "#FFFFFF" }}>500+</div>
              <p>Volunteers Engaged</p>
            </div>
            <div className="stat-card" style={{ background: "#bbdefb" }}>
              <div className="stat-number counter" style={{ color: "#FFFFFF" }}>12</div>
              <p>River Cleanup Events</p>
            </div>
            <div className="stat-card" style={{ background: "#bbdefb" }}>
              <div className="stat-number counter" style={{ color: "#FFFFFF" }}>2,500</div>
              <p>kg of Waste Collected</p>
            </div>
            <div className="stat-card" style={{ background: "#bbdefb" }}>
              <div className="stat-number counter" style={{ color: "#FFFFFF" }}>5</div>
              <p>Local Communities Impacted</p>
            </div>
          </div>
        </section>

        {/* Recent Cleanups */}
        <section className="recent-cleanups" ref={recentRef}>
          <h2>Recent Cleanup Operations</h2>
          <div className="divider"><div className="water-drop"></div></div>
          
          <div className="cleanup-grid">
            {/* Cleanup 1 */}
            <div className="cleanup-card">
              <div className="cleanup-image">
                <img src="Pasig.jpg" alt="Pasig River Cleanup" />
                <div className="cleanup-date">January 15, 2025</div>
              </div>
              <div className="cleanup-content">
                <h3>Pasig River Cleanup - Sector 7</h3>
                <div className="cleanup-details">
                  <div className="detail-item">
                    <span className="icon">📍</span>
                    <span>Pasig River, Metro Manila</span>
                  </div>
                  <div className="detail-item">
                    <span className="icon">👥</span>
                    <span>85 Volunteers</span>
                  </div>
                  <div className="detail-item">
                    <span className="icon">♻️</span>
                    <span>320kg Plastic Collected</span>
                  </div>
                </div>
                <p>
                  Our largest cleanup to date focused on the heavily polluted Sector 7 of Pasig River. 
                  Volunteers worked tirelessly for 6 hours, removing plastic bottles, bags, and industrial waste.
                </p>
                <div className="cleanup-impact">
                  <h4>Environmental Impact:</h4>
                  <ul>
                    <li>Prevented 320kg of plastic from reaching Manila Bay</li>
                    <li>Restored 2.5km of riverbank ecosystem</li>
                    <li>Improved water flow by 35%</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Cleanup 2 */}
            <div className="cleanup-card">
              <div className="cleanup-image">
                <img src="SanJuanRiver.jpg" alt="San Juan River Cleanup" />
                <div className="cleanup-date">December 10, 2024</div>
              </div>
              <div className="cleanup-content">
                <h3>San Juan River Restoration</h3>
                <div className="cleanup-details">
                  <div className="detail-item">
                    <span className="icon">📍</span>
                    <span>San Juan River, Metro Manila</span>
                  </div>
                  <div className="detail-item">
                    <span className="icon">👥</span>
                    <span>62 Volunteers</span>
                  </div>
                  <div className="detail-item">
                    <span className="icon">♻️</span>
                    <span>180kg Plastic Collected</span>
                  </div>
                </div>
                <p>
                  Community-led initiative targeting microplastics and debris accumulated during the rainy season. 
                  Special focus on protecting fish spawning areas.
                </p>
                <div className="cleanup-impact">
                  <h4>Environmental Impact:</h4>
                  <ul>
                    <li>Protected critical fish spawning grounds</li>
                    <li>Removed 180kg of mixed plastic waste</li>
                    <li>Educated 200+ local residents on river conservation</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Cleanup 3*/}
            <div className="cleanup-card">
              <div className="cleanup-image">
                <img src="Marikina.jpg" alt="Marikina River Cleanup" />
                <div className="cleanup-date">November 22, 2024</div>
              </div>
              <div className="cleanup-content">
                <h3>Marikina River Emergency Response</h3>
                <div className="cleanup-details">
                  <div className="detail-item">
                    <span className="icon">📍</span>
                    <span>Marikina River, Marikina City</span>
                  </div>
                  <div className="detail-item">
                    <span className="icon">👥</span>
                    <span>120 Volunteers</span>
                  </div>
                  <div className="detail-item">
                    <span className="icon">♻️</span>
                    <span>450kg Plastic Collected</span>
                  </div>
                </div>
                <p>
                  Emergency response to typhoon-related debris accumulation. Coordinated effort with local 
                  government units to prevent downstream pollution.
                </p>
                <div className="cleanup-impact">
                  <h4>Environmental Impact:</h4>
                  <ul>
                    <li>Prevented massive plastic discharge to Luzon Strait</li>
                    <li>Cleared 3.2km of critical water channels</li>
                    <li>Established early warning system for future events</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Before & After Gallery */}
        <section className="before-after-gallery" ref={galleryRef}>
          <h2>Transformation Gallery</h2>
          <div className="divider"><div className="water-drop"></div></div>
          
          <div className="gallery-grid">
            <div className="before-after-item">
              <h3>Pasig River - Sector 7</h3>
              <div className="comparison">
                <div className="before">
                  <img src="Pasig.jpg" alt="Before cleanup" />
                  <span className="label">Before</span>
                </div>
                <div className="after">
                  <img src="Pasig-Clean.jpg " alt="After cleanup" />
                  <span className="label">After</span>
                </div>
              </div>
            </div>
            
            <div className="before-after-item">
              <h3>San Juan River</h3>
              <div className="comparison">
                <div className="before">
                  <img src="SanJuanRiver.jpg" alt="Before cleanup" />
                  <span className="label">Before</span>
                </div>
                <div className="after">
                  <img src="SanJuan-Clean.webp" alt="After cleanup" />
                  <span className="label">After</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cleanup Methodology */}
        <section className="cleanup-methodology" ref={methodologyRef}>
          <h2>Our Cleanup Methodology</h2>
          <div className="divider"><div className="water-drop"></div></div>
          
          <div className="methodology-steps">
            <div className="method-step">
              <div className="step-number">1</div>
              <h3>Site Assessment</h3>
              <p>Comprehensive evaluation of pollution levels, accessibility, and environmental risks before each operation.</p>
            </div>
            
            <div className="method-step">
              <div className="step-number">2</div>
              <h3>Community Mobilization</h3>
              <p>Engaging local communities, schools, and organizations to ensure sustainable participation and ownership.</p>
            </div>
            
            <div className="method-step">
              <div className="step-number">3</div>
              <h3>Scientific Documentation</h3>
              <p>Systematic recording of waste types, quantities, and GPS coordinates for research and policy advocacy.</p>
            </div>
            
            <div className="method-step">
              <div className="step-number">4</div>
              <h3>Proper Disposal & Recycling</h3>
              <p>Partnering with certified waste management facilities to ensure collected plastics are properly processed.</p>
            </div>
          </div>
        </section>

        {/* Impact Data */}
        <section className="impact-data" ref={impactRef}>
          <h2>Future Plans</h2>
          <div className="divider"><div className="water-drop"></div></div>
          
          <div className="data-visualization">
            <div className="chart-container">
              <h3>Our Future Initiatives</h3>
              <ul style={{ textAlign: "left", fontSize: "1.1rem", lineHeight: "2", margin: "0 auto", maxWidth: 400 }}>
                <li>🌊 Expand cleanups to 10 new river systems nationwide</li>
                <li>🤝 Launch partnerships with local schools for youth river stewardship programs</li>
                <li>📊 Develop a public dashboard for real-time plastic waste tracking</li>
                <li>🔬 Pilot microplastic monitoring and research in 3 major rivers</li>
                <li>🏭 Collaborate with LGUs for improved waste management infrastructure</li>
                <li>🌱 Organize annual “River Festival” to celebrate and educate communities</li>
              </ul>
            </div>
            
            <div className="impact-metrics">
              <h3>Our Vision</h3>
              <div className="metrics-grid">
                <div className="metric">
                  <h4>Zero Plastic Rivers</h4>
                  <p>Achieve plastic-free status for at least 5 major rivers by 2030.</p>
                </div>
                <div className="metric">
                  <h4>Community Empowerment</h4>
                  <p>Train 2,000+ local river guardians and youth leaders.</p>
                </div>
                <div className="metric">
                  <h4>Innovation & Data</h4>
                  <p>Leverage technology for transparent, science-driven river protection.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cleanup-cta" ref={ctaRef}>
          <h2>Join Our Next Cleanup</h2>
          <div className="divider"><div className="water-drop"></div></div>
          <p>Every piece of plastic removed makes a difference. Be part of the solution.</p>
          <a href="/signup" className="cta-button">Volunteer Today</a>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Cleanups;