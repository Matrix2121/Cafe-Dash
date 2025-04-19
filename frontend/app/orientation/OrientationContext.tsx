import React, { createContext, useEffect, useState, ReactNode } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

type Orientation = 'PORTRAIT' | 'LANDSCAPE' | 'UNKNOWN';

export const OrientationContext = createContext<Orientation>('UNKNOWN');

export const OrientationProvider = ({ children }: { children: ReactNode }) => {
  const [orientation, setOrientation] = useState<Orientation>('UNKNOWN');

  useEffect(() => {
    const updateOrientation = (orientation: ScreenOrientation.Orientation) => {
      if (
        orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
        orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
      ) {
        setOrientation('LANDSCAPE');
      } else if (
        orientation === ScreenOrientation.Orientation.PORTRAIT_UP ||
        orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN
      ) {
        setOrientation('PORTRAIT');
      } else {
        setOrientation('UNKNOWN');
      }
    };

    ScreenOrientation.getOrientationAsync().then(updateOrientation);

    const subscription = ScreenOrientation.addOrientationChangeListener((evt) => {
      updateOrientation(evt.orientationInfo.orientation);
    });

    return () => {
      ScreenOrientation.removeOrientationChangeListeners();
    };
  }, []);

  return (
    <OrientationContext.Provider value={orientation}>
      {children}
    </OrientationContext.Provider>
  );
};