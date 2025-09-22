import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface RegisteredCrop {
  id: string;
  farmerName: string;
  state: string;
  landArea: string;
  soilFertility: string;
  season: string;
  cropType: string;
  plantingDate: string;
  harvestDate: string;
  registrationDate: string;
  yield: number;
  status: string;
}

interface CropContextType {
  registeredCrops: RegisteredCrop[];
  addCrop: (crop: Omit<RegisteredCrop, 'id' | 'registrationDate' | 'yield' | 'status'>) => void;
}

const CropContext = createContext<CropContextType | undefined>(undefined);

export const CropProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [registeredCrops, setRegisteredCrops] = useState<RegisteredCrop[]>([]);

  const addCrop = (cropData: Omit<RegisteredCrop, 'id' | 'registrationDate' | 'yield' | 'status'>) => {
    const newCrop: RegisteredCrop = {
      ...cropData,
      id: Date.now().toString(),
      registrationDate: new Date().toISOString().split('T')[0],
      yield: 0,
      status: 'Planted'
    };
    setRegisteredCrops(prev => [...prev, newCrop]);
  };

  return (
    <CropContext.Provider value={{
      registeredCrops,
      addCrop
    }}>
      {children}
    </CropContext.Provider>
  );
};

export const useCrop = () => {
  const context = useContext(CropContext);
  if (context === undefined) {
    throw new Error('useCrop must be used within a CropProvider');
  }
  return context;
};