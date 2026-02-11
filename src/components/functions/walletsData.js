import { APP_CONSTANTS } from '@constants/site.config';

import dataForDev from '../../assets/json/data.json';
import isLocalhost from './isLocalhost';

// Attempts to trigger PHP update and then fetch latest data.json.
export const updateWalletsData = async () => {
  try {
    const wallets = [
      ...Object.values(APP_CONSTANTS.javascript.collateralText.bitcoin.addressFull),
      ...Object.values(APP_CONSTANTS.javascript.collateralText.litecoin.addressFull),
      ...Object.values(APP_CONSTANTS.javascript.collateralText.tether.addressFull),
      ...Object.values(APP_CONSTANTS.javascript.collateralText.ethereum.addressFull),
    ].join(',');

    // Try to trigger server-side update (non-blocking if it fails)
    const response = await fetch(`/php/wallets.php?wallets=${wallets}`);
    if (!response.ok) {
      console.warn('Failed to update wallets data via PHP. Falling back to existing data.json');
    }

    // Then fetch data.json (may be updated or remain old)
    const updatedData = await fetch('/data.json');
    if (!updatedData.ok) {
      console.warn('Failed to fetch updated data.json. Falling back to bundled dataForDev');
      return dataForDev;
    }
    const jsonData = await updatedData.json();
    return jsonData;
  } catch (err) {
    console.error('updateWalletsData error, using fallback dataForDev:', err);
    return dataForDev;
  }
};

// Gets wallets data considering environment and freshness by date.
export const getWalletsData = async () => {
  try {
    const currentDate = new Date().toISOString().split('T')[0];

    if (isLocalhost()) {
      return dataForDev;
    }

    // Fetch current data.json
    const response = await fetch('/data.json');
    if (!response.ok) {
      console.warn('Failed to fetch data.json. Using bundled dataForDev');
      return dataForDev;
    }

    const data = await response.json();
    const dataDate = data.date;

    // Update if date is stale
    if (dataDate !== currentDate) {
      return await updateWalletsData();
    }

    return data;
  } catch (err) {
    console.error('getWalletsData error, using fallback dataForDev:', err);
    return dataForDev;
  }
};

export default getWalletsData;
