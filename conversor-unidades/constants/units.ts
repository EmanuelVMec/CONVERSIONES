export const units = {
  length: {
    name: 'Longitud',
    units: {
      m: 1,
      km: 1000,
      cm: 0.01,
      mm: 0.001,
      in: 0.0254,
      ft: 0.3048,
      yd: 0.9144,
      mi: 1609.344,
    },
  },
  area: {
    name: 'Área',
    units: {
      'm²': 1,
      'km²': 1e6,
      'cm²': 0.0001,
      'ft²': 0.092903,
      'in²': 0.00064516,
    },
  },
  volume: {
    name: 'Volumen',
    units: {
      L: 1,
      mL: 0.001,
      'cm³': 0.001,
      'm³': 1000,
      gal: 3.78541,
    },
  },
  temperature: {
    name: 'Temperatura',
    units: {
      C: 1,
      F: 1,
      K: 1,
    },
  },
  speed: {
    name: 'Velocidad',
    units: {
      'm/s': 1,
      'km/h': 0.277778,
      'mi/h': 0.44704,
      'ft/s': 0.3048,
    },
  },
  energy: {
    name: 'Energía',
    units: {
      J: 1,
      kJ: 1000,
      cal: 4.184,
      kcal: 4184,
    },
  },
  time: {
    name: 'Tiempo',
    units: {
      s: 1,
      min: 60,
      h: 3600,
      d: 86400,
    },
  },
  mass: {
    name: 'Masa',
    units: {
      kg: 1,
      g: 0.001,
      lb: 0.453592,
      oz: 0.0283495,
    },
  },
  pressure: {
    name: 'Presión',
    units: {
      Pa: 1,
      kPa: 1000,
      bar: 100000,
      psi: 6894.76,
    },
  },
  density: {
    name: 'Densidad',
    units: {
      'kg/m³': 1,
      'g/cm³': 1000,
      'lb/ft³': 16.0185,
    },
  },
  power: {
    name: 'Potencia',
    units: {
      W: 1,
      kW: 1000,
      hp: 745.7,
    },
  },
  fuel: {
    name: 'Combustible',
    units: {
      'km/L': 1,
      'mpg': 0.425144,  // US MPG to km/L
      'L/100km': 0.01,   // Especial: se trata diferente en la fórmula si deseas precisión
    },
  },
  data: {
    name: 'Datos',
    units: {
      B: 1,
      KB: 1024,
      MB: 1024 ** 2,
      GB: 1024 ** 3,
    },
  },
  currency: {
    name: 'Moneda',
    units: {
      USD: 1,
      EUR: 0.85,
      GBP: 0.75,
      JPY: 110,
    },
  },
};
