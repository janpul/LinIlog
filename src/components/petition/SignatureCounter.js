import React, { useEffect, useState } from 'react';

const SignatureCounter = () => {
  const [signatureCount, setSignatureCount] = useState(0);

  useEffect(() => {
    // Simulate fetching signature count from an API
    const fetchSignatureCount = async () => {
      // Replace with actual API call
      const response = await new Promise((resolve) => {
        setTimeout(() => resolve(1200), 1000); // Simulated response
      });
      setSignatureCount(response);
    };

    fetchSignatureCount();
  }, []);

  return (
    <div className="signature-counter">
      <h2>Signatures Collected</h2>
      <p>{signatureCount} people have signed the petition!</p>
    </div>
  );
};

export default SignatureCounter;