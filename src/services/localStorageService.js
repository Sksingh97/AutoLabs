import EncryptedStorage from 'react-native-encrypted-storage';

class StorageService {
  /**
   * Save data to persistent storage.
   * @param {string} key - The key to identify the stored data.
   * @param {Object} value - The data you want to store.
   * @returns {Promise<void>}
   */
  static async storeData(key, value) {
    try {
      await EncryptedStorage.setItem(
        key,
        JSON.stringify(value)
      );
      console.log('Data stored successfully.');
    } catch (error) {
      console.error('Error storing data: ', error);
    }
  }

  /**
   * Retrieve data from persistent storage.
   * @param {string} key - The key to identify the stored data.
   * @returns {Promise<Object|null>} The retrieved data or null if not found.
   */
  static async getData(key) {
    try {
      const data = await EncryptedStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error retrieving data: ', error);
      return null;
    }
  }

  /**
   * Remove data from persistent storage.
   * @param {string} key - The key to identify the data to be removed.
   * @returns {Promise<void>}
   */
  static async removeData(key) {
    try {
      await EncryptedStorage.removeItem(key);
      console.log('Data removed successfully.');
    } catch (error) {
      console.error('Error removing data: ', error);
    }
  }

  /**
   * Clear all data from persistent storage.
   * @returns {Promise<void>}
   */
  static async clearStorage() {
    try {
      await EncryptedStorage.clear();
      console.log('All data cleared.');
    } catch (error) {
      console.error('Error clearing storage: ', error);
    }
  }
}

export default StorageService;