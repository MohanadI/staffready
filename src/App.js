import { ConfigProvider } from 'antd';
import { theme } from './theme';
import DocumentControl from './modules/DocumentControl/documentControl';

function App() {
  return (
    <div className="App">
      <ConfigProvider
        theme={theme}
      >
        <DocumentControl />
      </ConfigProvider>
    </div>
  );
}

export default App;
