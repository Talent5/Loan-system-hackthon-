import React, { useState } from 'react';

const Options: React.FC = () => {
  const [settings, setSettings] = useState({
    notificationsEnabled: true,
    darkModeEnabled: false,
    language: 'en',
    riskThreshold: 'medium',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the settings to your backend
    console.log('Settings saved:', settings);
    // Show a success message
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">User Settings</h3>
        <form onSubmit={handleSubmit} className="mt-5 space-y-6">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="notificationsEnabled"
                name="notificationsEnabled"
                type="checkbox"
                checked={settings.notificationsEnabled}
                onChange={handleChange}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="notificationsEnabled" className="font-medium text-gray-700">Enable Notifications</label>
              <p className="text-gray-500">Receive alerts for new loan applications and status changes.</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="darkModeEnabled"
                name="darkModeEnabled"
                type="checkbox"
                checked={settings.darkModeEnabled}
                onChange={handleChange}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="darkModeEnabled" className="font-medium text-gray-700">Enable Dark Mode</label>
              <p className="text-gray-500">Use a darker color scheme for the application interface.</p>
            </div>
          </div>

          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700">Language</label>
            <select
              id="language"
              name="language"
              value={settings.language}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>

          <div>
            <label htmlFor="riskThreshold" className="block text-sm font-medium text-gray-700">Risk Threshold</label>
            <select
              id="riskThreshold"
              name="riskThreshold"
              value={settings.riskThreshold}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <p className="mt-2 text-sm text-gray-500">Set the default risk threshold for loan applications.</p>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Settings
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Options;