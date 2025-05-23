
interface SettingsProps {
  settings: {
    theme: string;
    notifications: boolean;
    language: string;
  };
}

export default function Settings({ settings }: SettingsProps) {
  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <div className="settings-content">
        <div className="setting-item">
          <h3>Theme</h3>
          <p>{settings.theme}</p>
        </div>
        <div className="setting-item">
          <h3>Notifications</h3>
          <p>{settings.notifications ? 'Enabled' : 'Disabled'}</p>
        </div>
        <div className="setting-item">
          <h3>Language</h3>
          <p>{settings.language}</p>
        </div>
      </div>
    </div>
  );
} 