import { NativeModules, Platform } from 'react-native';

const WidgetBridge = NativeModules.WidgetBridge;

export const buildWidgetPayload = (homeDetails, favoriteIds, authToken) => {
  if (!Array.isArray(homeDetails) || !Array.isArray(favoriteIds)) {
    return { favorites: [], authToken: authToken || '' };
  }

  const favoritesSet = new Set(favoriteIds);
  const favorites = [];

  homeDetails.forEach((floor) => {
    (floor.rooms || []).forEach((room) => {
      (room.appliance || []).forEach((appliance) => {
        if (favoritesSet.has(appliance.id)) {
          favorites.push({
            id: appliance.id,
            name: appliance.appliance_name,
            value: appliance.value,
            roomName: room.name,
            floorName: floor.name
          });
        }
      });
    });
  });

  return {
    favorites: favorites,
    updatedAt: Date.now(),
    authToken: authToken || ''
  };
};

export const updateWidgetData = async (payload) => {
  if (!WidgetBridge?.updateWidgetData) {
    return;
  }

  try {
    const data = JSON.stringify(payload);
    await WidgetBridge.updateWidgetData(data);
  } catch (error) {
    console.warn('Widget update failed:', error);
  }
};
