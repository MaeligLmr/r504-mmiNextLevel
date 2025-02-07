export const filterIncludes = (property) => (search) => (obj) => {
    if (typeof property !== 'string' || !obj.hasOwnProperty(property)) {
      throw new Error(`Invalid property: ${property}`);
    }
    if (typeof search !== 'string') {
      throw new Error(`Invalid search term: ${search}`);
    }
  
    const propertyValue = obj[property];
   
    if (typeof propertyValue === 'string') {
      return propertyValue.toLowerCase().includes(search.toLowerCase());
    }
    else if (Array.isArray(propertyValue)) {
      return propertyValue.some(item => 
        typeof item === 'string' && item.toLowerCase().includes(search.toLowerCase())
      );
    }
    else {throw new Error(`The value of property ${property} is not a string.`);}

  
  };

  export const filterIncludesArray = (property) => (search) => (obj) => {
    if (typeof property !== 'string' || !obj.hasOwnProperty(property)) {
      throw new Error(`Invalid property: ${property}`);
    }
    if (typeof search !== 'string') {
      throw new Error(`Invalid search term: ${search}`);
    }
  
    const propertyValue = obj[property];
    if (!Array.isArray(propertyValue)) {
      throw new Error(`The value of property ${property} should be an array.`);
    }    
    return propertyValue.some((item) => item.toLowerCase().includes(search.toLowerCase()));
  };
  

  export const filterBoolean = (property) => (search) => (obj) => {
    if (typeof property !== 'string') {
        throw new Error(`Invalid property: ${property}`);
    }

    if (!obj.hasOwnProperty(property)) {
        return false;
    }

    const propertyValue = obj[property];

    if (typeof propertyValue !== 'boolean') {
        return false;
    }
    return propertyValue === search;
};


export const combineFilters = (...filters) => (object) => {
    return filters.reduce((filter)=>filter(object),[])
  }