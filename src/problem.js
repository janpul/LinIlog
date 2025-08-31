import React, { useEffect, useRef } from 'react';
import Header from './header';
import Footer from './footer';
import './Homepage.css';
import './problem.css';

function Problem() {
  const heroRef = useRef(null);
  const factsRef = useRef(null);
  const riverBgRef = useRef(null);
  const impactRef = useRef(null);
  const microplasticsRef = useRef(null);
  const wildlifeRef = useRef(null);
  const actionRef = useRef(null);

  useEffect(() => {
    // Animate sections on mount
    [
      heroRef,
      factsRef,
      riverBgRef,
      impactRef,
      microplasticsRef,
      wildlifeRef,
      actionRef
    ].forEach(ref => {
      if (ref.current) ref.current.classList.remove('visible');
    });
    setTimeout(() => {
      [
        heroRef,
        factsRef,
        riverBgRef,
        impactRef,
        microplasticsRef,
        wildlifeRef,
        actionRef
      ].forEach(ref => {
        if (ref.current) ref.current.classList.add('visible');
      });
    }, 100);
  }, []);

  return (
    <div className="problem-page">
      <Header currentPage="problem" />
      <div className="problem-page-content">
        {/* Hero Section */}
        <section className="problem-hero" ref={heroRef}>
          <div className="problem-hero-content">
            <h1>Plastic Pollution Crisis</h1>
            <div className="divider"><div className="water-drop"></div></div>
            <p>
              Our rivers are drowning in plastic. Every year, millions of tons of plastic waste flow from land to sea, devastating ecosystems, harming wildlife, and threatening our health. The problem is urgent, but together, we can turn the tide.
            </p>
          </div>
          <div className="problem-hero-bg"></div>
        </section>

        {/* Key Facts Section */}
        <section className="problem-facts" ref={factsRef}>
          <h2>The Scale of the Problem</h2>
          <div className="divider"><div className="water-drop"></div></div>
          <div className="problem-facts-grid">
            <div className="fact-card">
              <img src="Plastic.png" alt="Plastic in ocean" />
              <div>
                <h3>11 Million Tons</h3>
                <p>of plastic enter our oceans every year</p>
              </div>
            </div>
            <div className="fact-card">
              <img src="Garbage.png" alt="River pollution" />
              <div>
                <h3>80%</h3>
                <p>of marine litter comes from land-based sources, mainly rivers</p>
              </div>
            </div>
            <div className="fact-card">
              <img src="River pollution.png" alt="Polluted river" />
              <div>
                <h3>1,000+</h3>
                <p>rivers are responsible for most plastic leakage to the sea</p>
              </div>
            </div>
            <div className="fact-card">
              <img src="Endangered.png" alt="Wildlife harmed" />
              <div>
                <h3>700+</h3>
                <p>marine species are threatened by plastic pollution</p>
              </div>
            </div>
          </div>
        </section>

        {/* River Background Section */}
        <section className="problem-river-bg" ref={riverBgRef}>
          <div className="problem-river-bg-overlay">
            <h2>Rivers: Highways of Plastic</h2>
            <p>
              Rivers act as highways, transporting plastic waste from cities and communities directly to the ocean. In the Philippines, some of the world's most plastic-polluted rivers flow through our neighborhoods, carrying bottles, bags, and microplastics to the sea.
            </p>
          </div>
        </section>

        {/* Impact Section */}
        <section className="problem-impact" ref={impactRef}>
          <h2>Why It Matters</h2>
          <div className="divider"><div className="water-drop"></div></div>
          <div className="problem-impact-grid">
            <div className="impact-block">
              <img src="Ecosystem impact.jpeg" alt="Ecosystem impact" />
              <h3 style={{ textAlign: "center", margin: "0 auto" }}>Environmental Impact</h3>
              <ul style={{ listStyleType: "none" }}>
                <li>Plastic debris kills marine life through ingestion and entanglement</li>
                <li>Microplastics contaminate soil, water, and the food chain</li>
                <li>Rivers clogged with waste worsen flooding and water quality</li>
                <li>Plastic pollution is found from mountain streams to the deepest ocean trenches</li>
              </ul>
            </div>
            <div className="impact-block">
              <img src="Human Impact.jpg" alt="Human impact" />
              <h3 style={{ textAlign: "center", margin: "0 auto" }}>Human Impact</h3>
              <ul style={{ listStyleType: "none" }}>
                <li>Microplastics detected in drinking water and food</li>
                <li>Linked to health risks for people and animals</li>
                <li>Polluted rivers and beaches harm tourism and local economies</li>
                <li>Disproportionate impact on vulnerable communities</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Microplastics Section with Image Background */}
        <section className="problem-microplastics-bg" ref={microplasticsRef}>
          <div className="problem-microplastics-overlay">
            <h2>The Microplastics Threat</h2>
            <p>
              Microplastics—tiny fragments less than 5mm—are now everywhere: in our rivers, oceans, air, and even inside our bodies. They are nearly impossible to remove and can carry toxic chemicals, posing a long-term threat to health and biodiversity.
            </p>
          </div>
        </section>

        {/* Wildlife Section */}
        <section className="problem-wildlife" ref={wildlifeRef}>
          <h2>Wildlife at Risk</h2>
          <div className="divider"><div className="water-drop"></div></div>
          <div className="problem-wildlife-grid">
            <div className="wildlife-card">
              <img src="Turtle.png" alt="Turtle and plastic" />
              <h3>Sea Turtles</h3>
              <p>Sea turtles mistake plastic bags for jellyfish, leading to fatal blockages and starvation.</p>
            </div>
            <div className="wildlife-card">
              <img src="Fish.png" alt="Fish and microplastics" />
              <h3>Fish</h3>
              <p>Fish ingest microplastics, which can accumulate up the food chain and reach our plates.</p>
            </div>
            <div className="wildlife-card">
              <img src="Bird.png" alt="Bird and plastic" />
              <h3>Birds</h3>
              <p>Many birds feed plastic pieces to their chicks, causing malnutrition and death.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="problem-cta" ref={actionRef}>
          <h2>What Can We Do?</h2>
          <div className="divider"><div className="water-drop"></div></div>
          <div className="problem-cta-grid" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", marginBottom: "150px" }}>
            <div style={{ flex: "1", maxWidth: "400px", textAlign: "right" }}>
              <ul style={{ textAlign: "right", listStyleType: "none", paddingLeft: 0 }}>
                <li>Reduce single-use plastics in your daily life</li>
                <li>Join river and community cleanups</li>
                <li>Support policies for better waste management</li>
                <li>Educate others about the plastic crisis</li>
              </ul>
              <a href="/signup" className="cta-button">Join the Movement</a>
            </div>
            <div style={{ flex: "1", maxWidth: "400px" }}>
              <img src="cleanup.jpg" alt="Community cleanup" style={{ width: "100%", display: "block" }} />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Problem;
