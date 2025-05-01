import { useState } from 'react';
import './App.css';
import GlobalStyle from './GlobalStyle';
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './themes';
import ThemeBox from './components/ThemeBox';
import { ToastContainer } from 'react-toastify';
import { performToast } from './utils/performToast';
import SimpleForm from './components/SimpleForm';
import LoaderDemo from './components/LoaderDemo';
import TodoList from './components/TodoList';
import SideBar from './components/SideBar';
import Display from './components/Display';

performToast({ msg: '요청에 성공하였습니다. 1', type: 'success' });
performToast({ msg: '요청에 실패하였습니다. 1', type: 'error' });
performToast({ msg: '요청에 성공하였습니다. 1', type: 'warning' });

function App() {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark(!isDark);

  const apiUrl = import.meta.env.VITE_API_URL;
  console.log(apiUrl);

  return (
    <Wrapper>
      {/* <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <ThemeBox onToggleTheme={toggleTheme} />
      </ThemeProvider>
      <ToastContainer />
      <SimpleForm />
      <LoaderDemo />
      <TodoList /> */}
      <SideBar />
      <Display />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
`;
