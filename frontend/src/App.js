import { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    email: "",
    credit_score: "",
    age_group: "",
    family_status: "",
    income: "",
    comments: "",
    consent: false,
  });

  const [leads, setLeads] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.consent) {
      alert("Please provide consent before submitting.");
      return;
    }

    const payload = {
      email: formData.email,
      credit_score: parseInt(formData.credit_score),
      age_group: formData.age_group,
      family_status: formData.family_status,
      income: parseInt(formData.income),
      comments: formData.comments,
    };

    try {
      const res = await axios.post("http://localhost:8000/score", payload);
      setLeads((prev) => [...prev, { ...res.data, comments: formData.comments }]);
      setFormData({
        email: "",
        credit_score: "",
        age_group: "",
        family_status: "",
        income: "",
        comments: "",
        consent: false,
      });
    } catch (err) {
      alert("Error scoring lead. Check console.");
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Lead Scoring Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required type="email" /><br />
        <input name="credit_score" placeholder="Credit Score (300-850)" value={formData.credit_score} onChange={handleChange} required type="number" /><br />
        <input name="age_group" placeholder="Age Group (e.g., 26–35)" value={formData.age_group} onChange={handleChange} required /><br />
        <input name="family_status" placeholder="Family Status" value={formData.family_status} onChange={handleChange} required /><br />
        <input name="income" placeholder="Income" value={formData.income} onChange={handleChange} required type="number" /><br />
        <textarea name="comments" placeholder="Comments" value={formData.comments} onChange={handleChange} /><br />
        <label>
          <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} required />
          I consent to data processing
        </label><br />
        <button type="submit">Submit</button>
      </form>

      <h2>Scored Leads</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Email</th>
            <th>Initial Score</th>
            <th>Reranked Score</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, index) => (
            <tr key={index}>
              <td>{lead.email}</td>
              <td>{lead.initial_score}</td>
              <td>{lead.reranked_score}</td>
              <td>{lead.comments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
