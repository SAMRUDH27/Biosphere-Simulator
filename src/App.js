import React, { useState, useEffect } from 'react';
import './App.css';
const Alert = ({ title, children }) => (
  <div className="alert">
    <p className="alert-title">{title}</p>
    <p>{children}</p>
  </div>
);

const BiosphereElement = ({ label, position, onClick, isActive }) => (
  <div
    className={`biosphere-element ${isActive ? 'element-active' : 'element-inactive'}`}
    style={{ top: `${position.y}%`, left: `${position.x}%` }}
    onClick={onClick}
  >
    <div className="biosphere-element-inner">
      {label}
    </div>
  </div>
);

const HealthBar = ({ value }) => (
  <div className="health-bar-container">
    <div
      className="health-bar"
      style={{ width: `${value}%` }}
    ></div>
  </div>
);

const SustainableBiosphereSimulator = () => {
  const [elements, setElements] = useState({
    sun: { active: true, position: { x: 10, y: 10 }, label: '☀️' },
    cloud: { active: false, position: { x: 30, y: 20 }, label: '☁️' },
    water: { active: true, position: { x: 50, y: 80 }, label: '💧' },
    tree: { active: true, position: { x: 70, y: 60 }, label: '🌳' },
    fish: { active: true, position: { x: 40, y: 70 }, label: '🐠' },
    factory: { active: false, position: { x: 80, y: 40 }, label: '🏭' },
    trash: { active: false, position: { x: 60, y: 50 }, label: '🗑️' },
    wind: { active: false, position: { x: 20, y: 40 }, label: '💨' },
  });

  const [ecosystemHealth, setEcosystemHealth] = useState(100);
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setEcosystemHealth((prevHealth) => {
        const newHealth = calculateEcosystemHealth();
        if (newHealth !== prevHealth) {
          setMessage(getHealthMessage(newHealth));
          setScore((prevScore) => prevScore + (newHealth - prevHealth));
        }
        return newHealth;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [elements]);

  const calculateEcosystemHealth = () => {
    let health = 100;
    if (elements.factory.active) health -= 20;
    if (elements.trash.active) health -= 15;
    if (!elements.tree.active) health -= 10;
    if (!elements.fish.active) health -= 10;
    if (!elements.water.active) health -= 15;
    if (elements.wind.active) health += 5;
    if (elements.cloud.active) health += 5;
    return Math.max(0, Math.min(100, health));
  };

  const getHealthMessage = (health) => {
    if (health > 80) return "Your ecosystem is thriving! Keep up the great work!";
    if (health > 60) return "The ecosystem is stable, but there's room for improvement. Can you make it even better?";
    if (health > 40) return "Your ecosystem is struggling. Take action now to improve its health!";
    if (health > 20) return "The ecosystem is in critical condition. Urgent action needed to prevent collapse!";
    return "Your ecosystem has collapsed. Let's start over and try to build a more sustainable environment.";
  };

  const toggleElement = (key) => {
    setElements((prev) => ({
      ...prev,
      [key]: { ...prev[key], active: !prev[key].active },
    }));
  };

  return (
    <div className="simulator-container">
      <div className="simulator-header">
        <h1 className="simulator-title">Sustainable Biosphere Simulator</h1>
        <HealthBar value={ecosystemHealth} />
        <p className="health-text">Ecosystem Health: {ecosystemHealth}%</p>
        <p className="health-text">Score: {score}</p>
        <Alert title="Status Update">
          {message}
        </Alert>
      </div>

      <div className="elements-container">
        {Object.entries(elements).map(([key, { active, position, label }]) => (
          <BiosphereElement
            key={key}
            label={label}
            position={position}
            onClick={() => toggleElement(key)}
            isActive={active}
          />
        ))}
      </div>

      <div className="simulator-footer">
        <p>Click on elements to toggle their state and observe the impact on the ecosystem.</p>
        <p>Find the right balance to create a sustainable biosphere and maximize your score!</p>
      </div>
    </div>
  );
};

export default SustainableBiosphereSimulator;