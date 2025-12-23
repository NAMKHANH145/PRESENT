import React, { useState } from 'react';
import './GateScreen.css';

const GateScreen = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Normalize strings: remove accents, convert to lowercase, remove spaces
    const normalizeString = (str) => {
      return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/\s+/g, ''); // Remove all spaces
    };

    // Check credentials (username: "Vợ iu", password: "122423")
    const normalizedUsername = normalizeString(username);
    const normalizedPassword = normalizeString(password);

    if (normalizedUsername === normalizeString('Vợ iu') && normalizedPassword === '24/12/2023') {
      onLoginSuccess();
    } else {
      setError('Ơ kìa, không phải Bé rồi!');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="gate-screen">
      <div className={`gate-container ${isShaking ? 'shake' : ''}`}>
        <h1>Chỉ dành cho Bé</h1>
        <p>Nhập mật khẩu để mở cánh cửa bí mật</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Tên biệt danh của Bé"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="pink-input"
          />
          <input
            type="text"
            placeholder="Ngày kỉ niệm (Ngày/Tháng/Năm)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pink-input"
            maxLength="10"
          />
          
          {error && <p className="error-message">{error}</p>}
          
          <button type="submit" className="pink-button unlock-button">
            Mở khóa
          </button>
        </form>
      </div>
    </div>
  );
};

export default GateScreen;