import { ConfigProvider } from 'antd';
import { theme } from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import DocumentControl from './modules/DocumentControl/DocumentControl';

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
