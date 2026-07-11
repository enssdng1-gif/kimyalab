import { useState, useCallback, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import RegisterScreen from './components/RegisterScreen';
import GradeSelect from './components/GradeSelect';
import Dashboard from './components/Dashboard';
import { StudentUser, loadLocalUser, flushPendingRegistrations } from './lib/api';

type Screen = 'splash' | 'register' | 'gradeSelect' | 'dashboard';

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [selectedGrade, setSelectedGrade] = useState<number>(9);
  const [user, setUser] = useState<StudentUser | null>(null);

  // Uygulama her açıldığında bağlantı kopukken kuyruğa alınmış kayıtları
  // arka planda tekrar göndermeyi dener — veri asla kaybolmaz.
  useEffect(() => { flushPendingRegistrations(); }, []);

  const handleSplashFinish = useCallback(() => {
    const existing = loadLocalUser();
    if (existing && existing.id !== 'BEKLEMEDE') {
      setUser(existing);
      setScreen('gradeSelect');
    } else {
      setScreen('register');
    }
  }, []);

  const handleRegistered = (u: StudentUser) => {
    setUser(u);
    setScreen('gradeSelect');
  };

  const handleGradeSelect = (grade: number) => {
    setSelectedGrade(grade);
    setScreen('dashboard');
  };

  const handleBack = () => {
    setScreen('gradeSelect');
  };

  return (
    <>
      {screen === 'splash' && <SplashScreen onFinish={handleSplashFinish} />}
      {screen === 'register' && <RegisterScreen onDone={handleRegistered} />}
      {screen === 'gradeSelect' && <GradeSelect onSelect={handleGradeSelect} />}
      {screen === 'dashboard' && user && (
        <Dashboard grade={selectedGrade} user={user} onUserChange={setUser} onBack={handleBack} />
      )}
    </>
  );
}
