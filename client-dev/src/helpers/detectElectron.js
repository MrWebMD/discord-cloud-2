const detectElectron = () => {
  return navigator.userAgent.toLowerCase().includes('electron');
}

export default detectElectron;