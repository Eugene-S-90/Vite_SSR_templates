
interface HomeProps {
  homeData: {
    title: string;
    welcomeMessage: string;
    stats: {
      visitors: number;
      activeUsers: number;
    };
  };
}

export default function Home({ homeData }: HomeProps) {
  return (
    <div className="home-page">
      <h1>{homeData.title}</h1>
      <p className="welcome-message">{homeData.welcomeMessage}</p>
      <div className="stats-container">
        <div className="stat-item">
          <h3>Visitors Today</h3>
          <p>{homeData.stats.visitors}</p>
        </div>
        <div className="stat-item">
          <h3>Active Users</h3>
          <p>{homeData.stats.activeUsers}</p>
        </div>
      </div>
    </div>
  );
} 