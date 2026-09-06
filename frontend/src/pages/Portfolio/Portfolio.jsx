import React from 'react';
import { Code, Server, Database, Layers, Github, ExternalLink, ShieldCheck, Cpu } from 'lucide-react';

const Portfolio = () => {
  const skills = [
    { name: 'Java 17 / Spring Boot 3', level: '95%', icon: Server, color: '#f89820' },
    { name: 'Spring Cloud (Eureka & Gateway)', level: '90%', icon: Layers, color: '#6db33f' },
    { name: 'React.js 18 & Modern UI', level: '92%', icon: Code, color: '#61dafb' },
    { name: 'MySQL & DB-Per-Service', level: '88%', icon: Database, color: '#00758f' },
    { name: 'API-First & OpenAPI 3.0', level: '94%', icon: Cpu, color: '#00f0ff' },
    { name: 'Git & Multi-Module Maven', level: '90%', icon: Github, color: '#f05032' },
  ];

  return (
    <div style={{ padding: '0 20px', maxWidth: '1100px', margin: '30px auto' }}>
      
      {/* Bio Header */}
      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #00f0ff, #7000ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
          <Cpu size={40} color="#fff" />
        </div>
        <h1 style={{ fontSize: '2.5rem', color: '#fff' }} className="brand-font">
          Full-Stack Microservices <span className="neon-text-cyan">Architect</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWdith: '700px', margin: '10px auto 0 auto', fontSize: '1rem', lineHeight: '1.6' }}>
          Passionate full-stack developer specializing in resilient cloud-native microservice backends, thread-safe database architectures, and futuristic web interfaces.
        </p>
      </div>

      {/* Skills Showcase */}
      <section style={{ marginBottom: '50px' }}>
        <h2 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '20px' }} className="brand-font">
          Technical Competencies
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <div key={skill.name} className="glass-card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icon size={20} color={skill.color} /> {skill.name}
                  </span>
                  <span style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>{skill.level}</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: skill.level, height: '100%', background: `linear-gradient(90deg, ${skill.color}, #00f0ff)`, borderRadius: '3px' }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Project Card */}
      <section>
        <h2 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '20px' }} className="brand-font">
          Featured Capstone Project
        </h2>

        <div className="glass-panel" style={{ padding: '32px', display: 'grid', gridTemplateColumns: '1fr 340px', gap: '30px' }}>
          <div>
            <span style={{ color: 'var(--accent-cyan)', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '1px' }}>FEATURED PRODUCTION RIG</span>
            <h3 style={{ fontSize: '1.8rem', color: '#fff', margin: '4px 0 12px 0' }} className="brand-font">PCForge Platform</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
              A full-stack online gaming PC marketplace and custom PC builder platform featuring 16 Spring Boot microservices, OpenAPI contracts, MySQL database-per-service isolation, pessimistic inventory locking, sandbox payment generator, and custom PC compatibility engine.
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {['Spring Boot', 'Spring Cloud', 'React 18', 'MySQL', 'OpenAPI 3.0', 'Pessimistic Locking'].map((tag) => (
                <span key={tag} style={{ background: 'rgba(0, 240, 255, 0.1)', border: '1px solid var(--accent-cyan)', color: 'var(--accent-cyan)', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div style={{ background: 'rgba(10,12,16,0.6)', padding: '20px', borderRadius: '10px', border: '1px solid var(--border-card)' }}>
            <h4 style={{ color: '#fff', marginBottom: '12px' }}>Project Stats</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Microservices:</span>
                <strong style={{ color: '#fff' }}>16 Spring Boot Apps</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Databases:</span>
                <strong style={{ color: '#fff' }}>12 MySQL DBs</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>API Gateway:</span>
                <strong style={{ color: '#fff' }}>Port 8080</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Discovery:</span>
                <strong style={{ color: '#fff' }}>Eureka 8761</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Portfolio;
