import React from 'react';
import PetitionForm from '../components/petition/PetitionForm';
import SignatureCounter from '../components/petition/SignatureCounter';
import LoadingScreen from '../components/animations/LoadingScreen';

function PetitionPage() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate loading time

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="petition-page">
      <h1>Sign the Petition</h1>
      <SignatureCounter />
      <PetitionForm />
    </div>
  );
}

export default PetitionPage;