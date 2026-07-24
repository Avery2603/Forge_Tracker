import React, { useState } from 'react';
import meals from './mealsData.json';

export default function App() {
  const [selectedMeal, setSelectedMeal] = useState(null);

  const totalCost = meals.reduce((acc, meal) => acc + meal.cost.total5Days, 0);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '16px', maxWidth: '600px', margin: '0 auto', backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh' }}>
      <header style={{ marginBottom: '24px', borderBottom: '1px solid #334155', pb: '16px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#38bdf8', margin: '0 0 8px 0' }}>Forge Tracker</h1>
        <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px' }}>5-Day Meal Prep & Macro Dashboard</p>
      </header>

      {/* Target Summary */}
      <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '16px', color: '#cbd5e1', marginTop: 0 }}>Daily Targets</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', textAlign: 'center' }}>
          <div><div style={{ color: '#38bdf8', fontWeight: 'bold' }}>2,500</div><div style={{ fontSize: '10px', color: '#94a3b8' }}>KCAL</div></div>
          <div><div style={{ color: '#4ade80', fontWeight: 'bold' }}>200g</div><div style={{ fontSize: '10px', color: '#94a3b8' }}>PROTEIN</div></div>
          <div><div style={{ color: '#facc15', fontWeight: 'bold' }}>60g</div><div style={{ fontSize: '10px', color: '#94a3b8' }}>FAT</div></div>
          <div><div style={{ color: '#f87171', fontWeight: 'bold' }}>295g</div><div style={{ fontSize: '10px', color: '#94a3b8' }}>CARBS</div></div>
        </div>
        <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #334155', fontSize: '13px', color: '#94a3b8' }}>
          Estimated 5-Day Grocery Cost: <strong style={{ color: '#4ade80' }}>${totalCost.toFixed(2)}</strong> (Walmart Vienna, WV)
        </div>
      </div>

      {/* Meal List */}
      <h2 style={{ fontSize: '18px', marginBottom: '12px' }}>5-Day Meal Plan</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {meals.map((meal) => (
          <div 
            key={meal.id} 
            onClick={() => setSelectedMeal(selectedMeal?.id === meal.id ? null : meal)}
            style={{ backgroundColor: '#1e293b', borderRadius: '8px', padding: '14px', cursor: 'pointer', border: selectedMeal?.id === meal.id ? '1px solid #38bdf8' : '1px solid transparent' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#38bdf8', textTransform: 'uppercase', fontWeight: 'bold' }}>{meal.category}</span>
                <h3 style={{ margin: '2px 0 0 0', fontSize: '15px' }}>{meal.name}</h3>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 'bold', color: '#4ade80' }}>${meal.cost.perServing.toFixed(2)}</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>{meal.macrosPerServing.calories} kcal | {meal.macrosPerServing.protein}g P</div>
              </div>
            </div>

            {selectedMeal?.id === meal.id && (
              <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #334155', fontSize: '13px' }}>
                <div style={{ marginBottom: '10px', color: '#cbd5e1' }}>
                  <strong>Macros per serving:</strong> {meal.macrosPerServing.calories} kcal | {meal.macrosPerServing.protein}g P | {meal.macrosPerServing.fat}g F | {meal.macrosPerServing.carbs}g C
                </div>

                <strong style={{ color: '#38bdf8' }}>Ingredients (Per Serving):</strong>
                <ul style={{ margin: '4px 0 12px 0', paddingLeft: '20px', color: '#cbd5e1' }}>
                  {meal.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                </ul>

                <strong style={{ color: '#38bdf8' }}>Prep Instructions:</strong>
                <ol style={{ margin: '4px 0 0 0', paddingLeft: '20px', color: '#cbd5e1' }}>
                  {meal.preparation.map((step, i) => <li key={i} style={{ marginBottom: '4px' }}>{step}</li>)}
                </ol>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
