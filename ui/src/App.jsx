import { useState } from 'react';
import { fullLoad } from 'systeminformation';
import './App.css';

function App() {
  const hardware = ['CPU', 'Graphic', 'OS', 'Network', 'Memory', 'Disk', 'Battery'];
  const [fulfilled, setfulfilled] = useState(undefined);
  const [displayInfo, setDisplayInfo] = useState(undefined);
  const Disk = [];
  let NetworkInfo = [];

  const fetchData = async (arg) => {
    setfulfilled(undefined);
    setDisplayInfo(arg);
    const res = await fetch(`http://127.0.0.1:4000/hardware/${arg.toLowerCase()}`)
      .then(response => response.json());

    if (arg === 'CPU') {
      setfulfilled(res);
    }

    if (arg === 'Graphic') {
      console.log(res);
      const { controllers } = res;
      const infoGPU = controllers[0];
      setfulfilled(infoGPU);
    }

    if (arg === 'OS') {
      setfulfilled(res);
    }
    
    if (arg === 'Network') {
      const { length } = res;

      for ( let i = 0; i < length; i++ ) {
        const { ifaceName, ip4, ip4subnet } = res[i];
        NetworkInfo.push(ifaceName, ip4, ip4subnet);
      }

      setfulfilled(NetworkInfo);
    }

    if (arg === 'Memory') {
      setfulfilled(res);
    }

    if (arg === 'Disk') {
      let DiskTwo = [];
      let DiskOne = res[0];
      const { length } = res;
      if ( length > 1) {
         DiskTwo = res[1];
      }
      Disk.push(DiskOne, DiskTwo);
      setfulfilled(Disk);
    }

    if (arg === 'Battery') {
      setfulfilled(res);
    }

  }

  const renderHardwareList = () => {
    return hardware.map((el, index) => {
      return (
        <li
          className="hardware-sellection__list--elem"
          key={index}
          onClick={() => fetchData(el)}
        >
          {el}
        </li>
      )
    })
  }

  const renderHardwareInfo = () => {

    if(displayInfo === 'CPU') {
      return (
        <>
          <li>Producent: {fulfilled.manufacturer}</li>
          <li>Numer procesora: {fulfilled.brand}</li>
          <li>Ilość rdzeni: {fulfilled.physicalCores}</li>
          <li>Bazowa częstotliwość procesora: {fulfilled.speed}</li>
          <li>Socket: {fulfilled.socket}</li>
        </>
      )
    }

    if(displayInfo === 'Graphic') {
      return (
        <>
          <li>Układ graficzny: {fulfilled.model}</li>
          <li>Pamięć: {fulfilled.memoryTotal}</li>
          <li>Pamięć użyta: {fulfilled.memoryUsed}</li>
          <li>Pamięć wolna: {fulfilled.memoryFree}</li>
          <li>Temperatura: {fulfilled.temperatureGpu}</li>
        </>
      )
    }

    if (displayInfo === 'OS') {
      return (
        <>
          <li>Wersja systemu: {fulfilled.distro}</li>
          <li>Architektura: {fulfilled.arch}</li>
          <li>Jądro systemu: {fulfilled.kernel}</li>
          <li>Nazwa urządzenia: {fulfilled.hostname}</li>
          <li>Identyfikator produktu: {fulfilled.serial}</li>
        </>
      )
    }

    if (displayInfo === 'Network') {
      console.log(fulfilled);
      return fulfilled.map((el, index) => {
        return (
          <>
            <li key={index}>{el}</li>
          </>
        )
      })

    }

    if(displayInfo === 'Memory') {
      return (
        <>
          <li>Pamięć całkowita: {fulfilled.total} MB</li>
          <li>Pamięć użyta: {fulfilled.used} MB</li>
          <li>Pamięć wolna: {fulfilled.free} MB</li>
        </>
      )
    }

    if(displayInfo === 'Disk') {
      return (
        <>
          <li>Nazwa: {fulfilled[0].name}</li>
          <li>Rozmiar: {fulfilled[0].size} MB</li>
          <li>Interfejs: {fulfilled[0].interfaceType}</li>
          <li>Typ: {fulfilled[0].type}</li>
          <li>Numer seryjny: {fulfilled[0].serialNum}</li>
          {!fulfilled[1] ? null : (
            <ul className="hardware-info__content">
            <li>Nazwa: {fulfilled[1].name}</li>
            <li>Rozmiar: {fulfilled[1].size} MB</li>
            <li>Interfejs: {fulfilled[1].interfaceType}</li>
            <li>Typ: {fulfilled[1].type}</li>
            <li>Numer seryjny: {fulfilled[1].serialNum}</li>
          </ul>
          )}
        </>
      )
    }

    if(displayInfo === 'Battery') {
      return (
        <>
          <li>Model: {fulfilled.model}</li>
          <li>Pojemność: {fulfilled.designedCapacity} {fulfilled.capacityUnit}</li>
          <li>Aktualna pojemność: {fulfilled.currentCapacity} {fulfilled.capacityUnit}</li>
          <li>Procent naładowania: {fulfilled.percent}</li>
          <li>Podłączona do ładowania: {fulfilled.isCharging ? 'Tak' : 'Nie'}</li>
        </>
      )
    }

  }


  return (
    <div className="App">
      <div className='hardware-sellection'>
        <ul className="hardware-sellection__list">
        {renderHardwareList()}
        </ul>
        <div className="hardware-info">
          <ul className="hardware-info__content">{fulfilled ? renderHardwareInfo() : 'select something first'}</ul>
        </div>
      </div>
    </div>
  );
}

export default App;
