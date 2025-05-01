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
    <BrowserRouter>
      <nav style={{ marginBottom: 20 }}>
        {/* Link : a태그와 동일한 역할을 하지만 react-router-dom을 활용해 spa방식으로 자연스럽게 화면전환 */}
        <Link to="/" style={{ marginRight: 12 }}>
          홈
        </Link>
        <Link to="/about" style={{ marginRight: 12 }}>
          소개
        </Link>
        <Link to="/profile/황인태">프로필</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
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
    </BrowserRouter>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
`;
