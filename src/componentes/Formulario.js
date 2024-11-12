import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import 'bootstrap/dist/css/bootstrap.min.css'; // Template estilitzat amb Bootstrap
 
const Formulari = () => {
  // Definim els estats per als camps del formulari
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [genere, setGenere] = useState('');
  const [acceptaCondicions, setAcceptaCondicions] = useState(false);
 
  // Funció que gestiona el canvi en els camps de text
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setAcceptaCondicions(checked);
    } else {
      if (name === 'nom') setNom(value);
      if (name === 'email') setEmail(value);
      if (name === 'genere') setGenere(value);
    }
  };
 
  // Funció per a gestionar l'enviament del formulari
  const handleSubmit = (e) => {
    e.preventDefault();
    // Processament de dades
    alert(`Nom: ${nom}, Email: ${email}, Gènere: ${genere}, Accepta Condicions: ${acceptaCondicions}`);
  };
 
  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
        <div className="mb-3">
          <label htmlFor="nom" className="form-label">Nom</label>
          <input
            type="text"
            id="nom"
            name="nom"
            className="form-control"
            value={nom}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="genere" className="form-label">Gènere</label>
          <select
            id="genere"
            name="genere"
            className="form-select"
            value={genere}
            onChange={handleChange}
          >
            <option value="">Selecciona...</option>
            <option value="home">Home</option>
            <option value="dona">Dona</option>
          </select>
        </div>
        <div className="form-check mb-3">
          <input
            type="checkbox"
            id="acceptaCondicions"
            name="acceptaCondicions"
            className="form-check-input"
            checked={acceptaCondicions}
            onChange={handleChange}
          />
          <label htmlFor="acceptaCondicions" className="form-check-label">
            Accepto les condicions
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </div>
  );
};
 
export default Formulari;
