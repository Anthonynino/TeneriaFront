import '../styles/Loading.css';

const LoadingScreen = () => {
  return (
    <div className="loading-container">
      <span className="loader"></span>
      <div className="loading-text">Por favor espera...</div>
    </div>
  );
};

export default LoadingScreen;
