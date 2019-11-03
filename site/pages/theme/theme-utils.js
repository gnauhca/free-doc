export default {
  getColorText(color) {
    if (typeof color === 'string') return color;
    
    if (typeof color === 'object') {
      if (color.rgb.a !== 1) {
        return `rgba(${color.rgba.r}, ${color.rgba.g}, ${color.rgba.b}, ${
          color.rgba.a
        })`;
      } 
      return color.hex.toUpperCase();
    }
    return '#000000';
  },

  isValidColor(color) {
    if (color.charAt(0) === '#') {
      color = color.substring(1);
      return [3, 4, 6, 8].indexOf(color.length) > -1 && !isNaN(parseInt(color, 16));
    } 
    return /^(rgb|hsl)a?\((\d+%?(deg|rad|grad|turn)?[,\s]+){2,3}[\s\/]*[\d\.]+%?\)$/i.test(color);
    
  },

  mapValuesToVars(values) {
    const vars = {};
    // eslint-disable-next-line guard-for-in
    for (const key in values) {
      vars[key] = this.mapValueToVar(key, values[key]);
    }
    return vars;
  },
  mapVarsToValues(vars) {
    const values = {};
    for (const key in vars) {
      values[key] = this.mapVarToValue(key, vars[key]);
    }
    return values;
  },
  mapValueToVar(key, value) {
    if (key.indexOf('color') > -1) {
      return this.getColorText(value);
    } if (key.indexOf('percent') > -1) {
      return value / 100;
    }
    return value;
  },
  mapVarToValue(key, v) {
    if (key.indexOf('percent') > -1) {
      return parseInt(v * 100);
    }
    return v;
  }
};
